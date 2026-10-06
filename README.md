# Pulso

Plataforma que cruza el desempeño comercial de cada vendedor con su nivel de motivación,
para que el gerente detecte a tiempo quién está bajando y cómo actuar.

Proyecto del Artefacto de Incorporación Estratégica de Tecnologías (ORT, 2026).

**Stack:** Next.js 15 · Supabase (Postgres + Auth) · Vercel · GitHub

**Roles:**
- **Vendedor:** ve sus propias métricas y responde la encuesta semanal de motivación.
- **Gerente:** ve el desempeño y la motivación de todo su equipo.

## Cómo funciona el despliegue

El código vive en este repositorio de GitHub. Vercel está conectado al repo: cada cambio en la rama `main` se publica automáticamente (CI/CD). La base de datos y el login están en Supabase.

Variables de entorno necesarias (en Vercel y en `.env.local` para correr localmente):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (clave pública: anon o publishable; nunca la service_role)

El esquema de la base está en `supabase/schema.sql`.

## Correr en la computadora (opcional)
```bash
npm install
cp .env.example .env.local   # completar con la URL y la clave de Supabase
npm run dev
```

## Estructura

```
app/
  login/        pantalla de inicio de sesión
  vendedor/     panel del vendedor (sólo rol vendedor)
  gerente/      panel del gerente (sólo rol gerente)
  auth/signout  cierre de sesión
lib/
  supabase/     conexión con Supabase (navegador, servidor y middleware)
  perfil.ts     lectura del perfil y control de rol
middleware.ts   exige sesión iniciada en todas las páginas
supabase/
  schema.sql    tabla de perfiles, roles, políticas RLS y trigger
```

## Seguridad (base para el dossier)
- **Autenticación:** Supabase Auth con email y contraseña. No hay registro público:
  los usuarios los da de alta la empresa.
- **Autorización en dos capas:** la app redirige según el rol, y además la base de datos
  aplica Row Level Security: un vendedor sólo puede leer su propio perfil, aunque intente
  consultar la base directamente.
- **Nadie puede cambiarse el rol** desde la app: no existe política de escritura sobre `profiles`.
- **Claves:** sólo se usa la clave pública en el frontend; `.env.local` está en `.gitignore`.

## Próximas etapas
- Tablas de ventas y oportunidades, alimentadas desde la API de HubSpot + carga masiva de históricos.
- Encuesta semanal de motivación.
- Análisis con IA que cruce desempeño y motivación.
- Automatizaciones en n8n: envío de la encuesta y alertas al gerente.
