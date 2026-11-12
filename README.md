# Dinama Prepagado

Portal web para controlar servicios **prepagados de SMS** sobre el servicio CPaaS de Dinama: saldo en Bs por lotes, carga y agendamiento de envíos desde plantillas Excel, seguimiento de entregas y reportes, con dos roles principales (Cliente y Administrador Dinama).

El proyecto se desarrolla con **Spec-Driven Development (SDD)**. La constitución, las especificaciones, el plan y las tareas viven en la carpeta de documentación del proyecto (fuera de este repositorio) y mandan sobre el código.

## Requisitos

- Node.js 22 (ver `.nvmrc`) y pnpm 10 (`corepack enable`)
- Docker (para MySQL 8, Redis y Mailpit en desarrollo)

## Puesta en marcha

```bash
pnpm install
cp infra/.env.example infra/.env
docker compose -f infra/docker-compose.dev.yml --env-file infra/.env up -d --wait
export DATABASE_URL=mysql://dinama:dinama_dev_pw@127.0.0.1:3306/dinama_dev
pnpm db:migrate
pnpm test
```

Si el puerto 3306 ya está en uso, cambie `MYSQL_PORT` en `infra/.env` y el puerto de `DATABASE_URL`.

## Comandos

| Comando                             | Qué hace                                                          |
| ----------------------------------- | ----------------------------------------------------------------- |
| `pnpm test`                         | Ejecuta los tests (los de base de datos requieren `DATABASE_URL`) |
| `pnpm lint`                         | ESLint                                                            |
| `pnpm format` / `pnpm format:check` | Prettier                                                          |
| `pnpm typecheck`                    | TypeScript en todos los paquetes                                  |
| `pnpm db:migrate`                   | Aplica las migraciones de MySQL                                   |

## Estructura

- `packages/core`: lógica pura del negocio, sin E/S
- `packages/db`: esquema Drizzle, migraciones y conexión a MySQL
- `infra/`: Docker Compose y variables de entorno de ejemplo
