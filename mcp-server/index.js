#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar datos del CV
const cvData = JSON.parse(
  readFileSync(join(__dirname, "cv-data.json"), "utf-8")
);

// Crear servidor MCP
const server = new Server(
  {
    name: "camilo-marin-cv",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// Definir herramientas disponibles
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "obtener_perfil",
        description:
          "Obtiene la información personal y de contacto de Camilo Marin",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      {
        name: "obtener_habilidades",
        description:
          "Obtiene las habilidades técnicas de Camilo, opcionalmente filtradas por categoría",
        inputSchema: {
          type: "object",
          properties: {
            categoria: {
              type: "string",
              description:
                "Categoría de habilidades: 'frontend', 'backend', 'otras', o 'todas'",
              enum: ["frontend", "backend", "otras", "todas"],
            },
            nivel_minimo: {
              type: "number",
              description: "Nivel mínimo de habilidad (0-100)",
            },
          },
          required: [],
        },
      },
      {
        name: "obtener_experiencia",
        description:
          "Obtiene la experiencia laboral de Camilo, opcionalmente filtrada por tipo o año",
        inputSchema: {
          type: "object",
          properties: {
            tipo: {
              type: "string",
              description:
                "Tipo de empresa: 'Emprendimiento', 'Agencia', 'Consultoría', etc.",
            },
            año: {
              type: "string",
              description: "Año específico para filtrar experiencias",
            },
          },
          required: [],
        },
      },
      {
        name: "obtener_servicios",
        description: "Obtiene los servicios que Camilo puede ofrecer",
        inputSchema: {
          type: "object",
          properties: {
            servicio_id: {
              type: "string",
              description:
                "ID específico del servicio: 'web-development', 'mobile-development', 'digital-marketing', 'design', 'ai'",
            },
          },
          required: [],
        },
      },
      {
        name: "obtener_proyectos",
        description:
          "Obtiene los proyectos realizados por Camilo, opcionalmente filtrados por tipo",
        inputSchema: {
          type: "object",
          properties: {
            tipo: {
              type: "string",
              description:
                "Tipo de proyecto: 'Experimento', 'Consultoría', 'Empresa', 'Emprendimiento'",
            },
          },
          required: [],
        },
      },
      {
        name: "verificar_disponibilidad",
        description:
          "Verifica la disponibilidad de Camilo para diferentes tipos de trabajo",
        inputSchema: {
          type: "object",
          properties: {
            tipo_trabajo: {
              type: "string",
              description:
                "Tipo de trabajo: 'Tiempo completo', 'Freelance', 'Consultoría', 'Proyectos'",
            },
            modalidad: {
              type: "string",
              description: "Modalidad de trabajo: 'Remoto', 'Híbrido', 'Presencial'",
            },
          },
          required: [],
        },
      },
      {
        name: "buscar_match",
        description:
          "Evalúa si Camilo es un buen match para una posición específica basándose en habilidades y experiencia requeridas",
        inputSchema: {
          type: "object",
          properties: {
            habilidades_requeridas: {
              type: "array",
              items: { type: "string" },
              description: "Lista de habilidades requeridas para la posición",
            },
            tipo_empresa: {
              type: "string",
              description: "Tipo de empresa o industria",
            },
            modalidad: {
              type: "string",
              description: "Modalidad de trabajo preferida",
            },
          },
          required: ["habilidades_requeridas"],
        },
      },
      {
        name: "obtener_contacto",
        description:
          "Obtiene la información de contacto de Camilo para iniciar comunicación",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    ],
  };
});

// Implementar manejadores de herramientas
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "obtener_perfil": {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                nombre: cvData.personal.nombre,
                alias: cvData.personal.alias,
                titulo: cvData.personal.titulo,
                descripcion: cvData.personal.descripcion,
                ubicacion: cvData.personal.ubicacion,
                estadisticas: cvData.personal.estadisticas,
                idiomas: cvData.idiomas,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "obtener_habilidades": {
      const categoria = args?.categoria || "todas";
      const nivelMinimo = args?.nivel_minimo || 0;

      let habilidades = {};

      if (categoria === "todas") {
        habilidades = cvData.habilidades;
      } else {
        habilidades[categoria] = cvData.habilidades[categoria];
      }

      // Filtrar por nivel mínimo
      const habilidadesFiltradas = {};
      for (const [cat, skills] of Object.entries(habilidades)) {
        if (skills) {
          habilidadesFiltradas[cat] = skills.filter(
            (s) => s.nivel >= nivelMinimo
          );
        }
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(habilidadesFiltradas, null, 2),
          },
        ],
      };
    }

    case "obtener_experiencia": {
      let experiencias = cvData.experiencia;

      if (args?.tipo) {
        experiencias = experiencias.filter((e) =>
          e.tipo.toLowerCase().includes(args.tipo.toLowerCase())
        );
      }

      if (args?.año) {
        experiencias = experiencias.filter(
          (e) =>
            e.periodo.inicio === args.año || e.periodo.fin === args.año
        );
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(experiencias, null, 2),
          },
        ],
      };
    }

    case "obtener_servicios": {
      if (args?.servicio_id) {
        const servicio = cvData.servicios.find(
          (s) => s.id === args.servicio_id
        );
        return {
          content: [
            {
              type: "text",
              text: servicio
                ? JSON.stringify(servicio, null, 2)
                : "Servicio no encontrado",
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(cvData.servicios, null, 2),
          },
        ],
      };
    }

    case "obtener_proyectos": {
      let proyectos = cvData.proyectos;

      if (args?.tipo) {
        proyectos = proyectos.filter((p) =>
          p.tipo.toLowerCase().includes(args.tipo.toLowerCase())
        );
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(proyectos, null, 2),
          },
        ],
      };
    }

    case "verificar_disponibilidad": {
      const disponibilidad = cvData.disponibilidad;
      const resultado = {
        disponible: true,
        detalles: disponibilidad,
      };

      if (args?.tipo_trabajo) {
        resultado.tipo_trabajo_disponible = disponibilidad.tipo.includes(
          args.tipo_trabajo
        );
      }

      if (args?.modalidad) {
        resultado.modalidad_disponible = disponibilidad.modalidad.includes(
          args.modalidad
        );
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(resultado, null, 2),
          },
        ],
      };
    }

    case "buscar_match": {
      const habilidadesRequeridas = args.habilidades_requeridas || [];
      const todasHabilidades = [
        ...cvData.habilidades.frontend,
        ...cvData.habilidades.backend,
        ...cvData.habilidades.otras,
      ];

      const matches = [];
      const noMatches = [];

      for (const requerida of habilidadesRequeridas) {
        const match = todasHabilidades.find((h) =>
          h.nombre.toLowerCase().includes(requerida.toLowerCase())
        );

        if (match) {
          matches.push({
            habilidad: requerida,
            encontrada: match.nombre,
            nivel: match.nivel,
          });
        } else {
          noMatches.push(requerida);
        }
      }

      const porcentajeMatch =
        (matches.length / habilidadesRequeridas.length) * 100;

      const resultado = {
        porcentaje_match: Math.round(porcentajeMatch),
        habilidades_encontradas: matches,
        habilidades_no_encontradas: noMatches,
        recomendacion:
          porcentajeMatch >= 70
            ? "Excelente match - Camilo cumple con la mayoría de requisitos"
            : porcentajeMatch >= 50
            ? "Buen match - Camilo puede aprender rápidamente las habilidades faltantes"
            : "Match parcial - Revisar si las habilidades faltantes son críticas",
        contacto: cvData.personal.contacto.email,
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(resultado, null, 2),
          },
        ],
      };
    }

    case "obtener_contacto": {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                nombre: cvData.personal.nombre,
                contacto: cvData.personal.contacto,
                disponibilidad: cvData.disponibilidad,
                mensaje:
                  "Para contactar a Camilo, puedes usar cualquiera de los canales listados. WhatsApp es el método de respuesta más rápida.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    default:
      return {
        content: [
          {
            type: "text",
            text: `Herramienta desconocida: ${name}`,
          },
        ],
        isError: true,
      };
  }
});

// Definir recursos disponibles
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "cv://perfil-completo",
        name: "CV Completo de Camilo Marin",
        description: "Acceso al CV completo en formato JSON",
        mimeType: "application/json",
      },
      {
        uri: "cv://resumen-ejecutivo",
        name: "Resumen Ejecutivo",
        description: "Resumen ejecutivo del perfil profesional",
        mimeType: "text/plain",
      },
    ],
  };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === "cv://perfil-completo") {
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(cvData, null, 2),
        },
      ],
    };
  }

  if (uri === "cv://resumen-ejecutivo") {
    const resumen = `
RESUMEN EJECUTIVO - CAMILO MARIN
================================

Nombre: ${cvData.personal.nombre}
Título: ${cvData.personal.titulo}
Ubicación: ${cvData.personal.ubicacion.ciudad}, ${cvData.personal.ubicacion.pais}

PERFIL:
${cvData.personal.descripcion}

ESTADÍSTICAS:
- ${cvData.personal.estadisticas.proyectos_completados} proyectos completados
- ${cvData.personal.estadisticas.clientes_atendidos} clientes atendidos
- ${cvData.personal.estadisticas.socios_comerciales} socios comerciales

HABILIDADES DESTACADAS:
${cvData.habilidades.frontend
  .filter((h) => h.nivel >= 80)
  .map((h) => `- ${h.nombre}: ${h.nivel}%`)
  .join("\n")}

SERVICIOS PRINCIPALES:
${cvData.servicios.map((s) => `- ${s.nombre}`).join("\n")}

CONTACTO:
- Email: ${cvData.personal.contacto.email}
- WhatsApp: ${cvData.personal.contacto.whatsapp}
- LinkedIn: ${cvData.personal.contacto.linkedin}
- GitHub: ${cvData.personal.contacto.github}
    `.trim();

    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: resumen,
        },
      ],
    };
  }

  throw new Error(`Recurso no encontrado: ${uri}`);
});

// Iniciar servidor
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server de Camilo Marin iniciado correctamente");
}

main().catch(console.error);
