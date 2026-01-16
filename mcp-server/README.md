# MCP Server - CV de Camilo Marin

Un servidor MCP (Model Context Protocol) que permite a empresas y sistemas de IA conectarse con el CV profesional de Camilo Marin de manera estructurada y programática.

## Instalación

### Opción 1: Clonar el repositorio

```bash
git clone https://github.com/universomarin/cv.git
cd cv/mcp-server
npm install
```

### Opción 2: Usar directamente con npx (próximamente)

```bash
npx camilo-marin-cv-mcp
```

## Configuración en Claude Desktop

Agrega la siguiente configuración a tu archivo `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "camilo-marin-cv": {
      "command": "node",
      "args": ["/ruta/a/cv/mcp-server/index.js"]
    }
  }
}
```

## Herramientas Disponibles

### `obtener_perfil`
Obtiene la información personal y de contacto de Camilo Marin.

```json
{}
```

### `obtener_habilidades`
Obtiene las habilidades técnicas, opcionalmente filtradas.

```json
{
  "categoria": "frontend",  // "frontend", "backend", "otras", "todas"
  "nivel_minimo": 70        // Filtrar por nivel mínimo (0-100)
}
```

### `obtener_experiencia`
Obtiene la experiencia laboral, opcionalmente filtrada.

```json
{
  "tipo": "Emprendimiento",  // Tipo de empresa
  "año": "2020"              // Año específico
}
```

### `obtener_servicios`
Obtiene los servicios que Camilo puede ofrecer.

```json
{
  "servicio_id": "web-development"  // Opcional: ID específico del servicio
}
```

IDs de servicios disponibles:
- `web-development`
- `mobile-development`
- `digital-marketing`
- `design`
- `ai`

### `obtener_proyectos`
Obtiene los proyectos realizados.

```json
{
  "tipo": "Experimento"  // "Experimento", "Consultoría", "Empresa", "Emprendimiento"
}
```

### `verificar_disponibilidad`
Verifica la disponibilidad para diferentes tipos de trabajo.

```json
{
  "tipo_trabajo": "Freelance",  // "Tiempo completo", "Freelance", "Consultoría", "Proyectos"
  "modalidad": "Remoto"         // "Remoto", "Híbrido", "Presencial"
}
```

### `buscar_match`
Evalúa si Camilo es un buen match para una posición específica.

```json
{
  "habilidades_requeridas": ["React", "JavaScript", "CSS"],
  "tipo_empresa": "Startup",
  "modalidad": "Remoto"
}
```

### `obtener_contacto`
Obtiene la información de contacto para iniciar comunicación.

```json
{}
```

## Recursos Disponibles

### `cv://perfil-completo`
Acceso al CV completo en formato JSON estructurado.

### `cv://resumen-ejecutivo`
Resumen ejecutivo del perfil profesional en texto plano.

## Ejemplo de Uso

Una vez configurado, puedes usar el MCP para hacer consultas como:

> "¿Cuáles son las habilidades de frontend de Camilo con nivel mayor a 80%?"

El asistente usará la herramienta `obtener_habilidades` con los parámetros apropiados y te dará una respuesta estructurada.

> "¿Es Camilo un buen candidato para una posición de React Developer remoto?"

El asistente usará `buscar_match` para evaluar la compatibilidad y `verificar_disponibilidad` para confirmar la modalidad.

## Contacto

- **Email:** tiodematias@gmail.com
- **WhatsApp:** +573124860738
- **LinkedIn:** [tiodematias](https://www.linkedin.com/in/tiodematias)
- **GitHub:** [tiodematias](https://github.com/tiodematias)
- **Website:** [tiodematias.co](https://tiodematias.co)

## Licencia

MIT
