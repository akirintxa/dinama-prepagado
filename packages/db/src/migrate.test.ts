import { describe, expect, it } from 'vitest';
import { sql } from 'drizzle-orm';
import { execFileSync } from 'node:child_process';
import { createDb, createPool } from './client.js';

// Prueba de integración: requiere un MySQL accesible en DATABASE_URL (en CI lo provee el servicio).
describe.skipIf(!process.env.DATABASE_URL)('migraciones (T04)', () => {
  it('aplica las migraciones y deja la tabla app_meta', async () => {
    execFileSync('pnpm', ['--filter', '@dinama/db', 'migrate'], { stdio: 'pipe' });
    const pool = createPool();
    try {
      const db = createDb(pool);
      const [rows] = await db.execute(
        sql`SELECT COUNT(*) AS n FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'app_meta'`,
      );
      expect(Number((rows as unknown as Array<{ n: number | string }>)[0]?.n)).toBe(1);
    } finally {
      await pool.end();
    }
  }, 30_000);

  it('es idempotente: aplicar de nuevo no falla', () => {
    expect(() =>
      execFileSync('pnpm', ['--filter', '@dinama/db', 'migrate'], { stdio: 'pipe' }),
    ).not.toThrow();
  }, 30_000);
});
