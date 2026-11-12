import { mysqlTable, varchar, timestamp } from 'drizzle-orm/mysql-core';

/**
 * Metadatos de la aplicación (versión del esquema, banderas internas).
 * Es la única tabla de la migración inicial (T04); el resto llega en la Fase 2.
 */
export const appMeta = mysqlTable('app_meta', {
  key: varchar('key', { length: 64 }).primaryKey(),
  value: varchar('value', { length: 255 }).notNull(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});
