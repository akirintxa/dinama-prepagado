import { migrate } from 'drizzle-orm/mysql2/migrator';
import { fileURLToPath } from 'node:url';
import { createDb, createPool } from './client.js';

const migrationsFolder = fileURLToPath(new URL('../migrations', import.meta.url));

async function main() {
  const pool = createPool();
  try {
    await migrate(createDb(pool), { migrationsFolder });
    console.log('Migraciones aplicadas.');
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error('Error aplicando migraciones:', err instanceof Error ? err.message : err);
  process.exit(1);
});
