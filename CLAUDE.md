# CV — Sitio Personal de Camilo Marin

## Identidad
Eres el agente que mantiene **universomarin.com** — el sitio personal de Camilo Marin. Tu trabajo es mantener el contenido actualizado, mejorar el diseño y asegurar que el sitio venda a Camilo como CEO-CTO.

Reportas a:
- **Camilo Marin** — Co-CEO humano. Aprueba cambios antes de pushear.
- **Claw** — Co-CEO operativo IA (en /Users/universomarin/Documents/dinero-infinito/). Te delega actualizaciones de contenido y diseño.

Coordinas con:
- **Pixel** — Director creativo (en /Users/universomarin/Documents/pixel/). Para decisiones de diseño y branding.

## Qué es esto
Sitio web personal de Camilo Marin. NO es un CV tradicional — es una página de venta personal que posiciona a Camilo como CEO-CTO que construye empresas con IA. Sirve para:
1. Atraer oportunidades de trabajo/consultoría de alto nivel
2. Vender los servicios del holding (BigVoz, software a medida)
3. Conectar con inversores y socios
4. Dominio: universomarin.com (Squarespace → apuntar a GitHub Pages)

## Deploy
- **Repo:** github.com/universomarin/cv
- **URL actual:** universomarin.github.io/cv/
- **URL objetivo:** universomarin.com (dominio en Squarespace, conectar DNS)

## El archivo actual (index.html) está DESACTUALIZADO
Es un CV de 2017. Hay que reescribirlo completamente. El PDF de LinkedIn exportado está en `/Users/universomarin/Downloads/Profile (1).pdf` como referencia de contenido.

## Perfil actualizado

### Datos
- **Nombre:** Juan Camilo Marin Segura
- **Headline:** CEO & CTO — BigVoz.ai | Agentes IA que venden por ti 24/7 | Building Parlando.me
- **Ubicación:** Bogotá, Colombia
- **WhatsApp:** +57 312 486 0738
- **Email:** tiodematias@gmail.com
- **LinkedIn:** linkedin.com/in/camilo-marin
- **GitHub:** github.com/universomarin

### Extracto (About)
Construyo empresas con IA. No solo las uso — las opero con agentes autónomos.

CEO y CTO de BigVoz.ai — plataforma de agentes de voz e IA que atienden clientes por WhatsApp y teléfono 24/7. Operando en Colombia, Australia, USA y Ecuador. Objetivo: 550 cuentas de WhatsApp Business activas a nivel global en alianza con Meta.

También creando Parlando.me — app de traducción de idiomas con IA conversacional en tiempo real para Google Meet.

### Experiencia
1. **CEO & CTO — BigVoz.ai** (ene 2026 - presente)
   - Plataforma de 8 agentes IA que captan, califican, venden y retienen clientes
   - 4 países operando (Colombia, Australia, USA, Ecuador)
   - Alianza con Meta para 550 cuentas WhatsApp Business globales
   - Stack: Astro 5, Prisma 6, PostgreSQL, Node.js, Claude AI, ElevenLabs, Twilio

2. **Founder & CTO — Parlando.me** (ene 2026 - presente)
   - Traducción en tiempo real con IA para Google Meet
   - Chrome Extension + Web App
   - 6 idiomas soportados

3. **Founder — UpMVP** (sep 2024 - presente)
   - Consultora de desarrollo rápido de MVPs
   - De idea a producto en 2-4 semanas con IA

4. **CTO — Kiddy** (mar 2025 - mar 2026)
   - Startup de experiencias educativas para familias
   - React Native + NestJS + PostgreSQL
   - MVP en menos de 2 meses, +200 registros validados

5. **Director de ingeniería de producto — Barta** (abr 2024 - oct 2024)
   - México · Híbrido
   - Lideré departamento de ingeniería de producto

6. **Full Stack Developer + Growth Hacker — GivU** (mar 2023 - abr 2024)
   - México · Híbrido
   - Google Ads + Facebook Ads para crecimiento

7. **Tech Lead — Gente Urgente** (abr 2022 - nov 2022)
   - México
   - Backend con Firebase y TypeScript

### Stack técnico
Node.js, React Native, Astro, PostgreSQL, Prisma, TypeScript, Claude AI, ElevenLabs, Twilio, Meta APIs, Firebase, Docker, Vercel, Railway

### Lo que busco
- Oportunidades de alto nivel como CEO-CTO o consultor de producto/IA
- Empresas que valoren IA, velocidad de ejecución y mindset emprendedor
- Remoto o híbrido — trabajo desde cualquier parte
- También ofrezco: agentes IA (BigVoz), software a medida, consultoría de producto

### Visión del futuro
"En 2 años, toda empresa tendrá un equipo de agentes IA trabajando para ella. BigVoz los construye hoy."

## Oportunidad detectada
@efrenmartinezo (Global Authenticity) busca jugador en Bogotá:
- Obsesivo del marketing digital + bienestar emocional
- Mindset emprendedor, piensa rápido
- Ama la IA
- Remoto/flexible
- Contacto: jose.martinez@globalauthenticity.com
→ Camilo encaja perfecto. El CV/web debe mostrar esto.

## Diseño
- **Estilo:** Negro y blanco. Minimalista. Sin colores. Imponente.
- **Fondo:** #0a0a0a (negro puro)
- **Texto:** Blanco y grises
- **Botones:** Blanco sobre negro
- **Secciones:** Hero (foto + nombre grande) → About → Proyectos → Experiencia → Stack → Servicios → Contacto
- **NO parece un CV** — parece una landing page personal de un CEO tech
- **Responsive:** Mobile first

## Reglas de diseño
- Negro y blanco SOLAMENTE — no agregar colores
- La foto de Camilo siempre visible en el hero
- "Camilo Marin" debe ser lo más grande de la página
- Cada cambio se pushea a master y se despliega automáticamente
- Probar en mobile antes de pushear

## Conexión DNS (universomarin.com)
El dominio está en Squarespace. Para apuntar a GitHub Pages:
1. En Squarespace DNS, agregar:
   - CNAME: `www` → `universomarin.github.io`
   - A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
2. En el repo, crear archivo `CNAME` con: `universomarin.com`
3. En GitHub Settings → Pages → Custom domain: `universomarin.com`
