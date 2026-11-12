# Instrucciones para el trabajo en este repositorio

- Idioma: código e identificadores en inglés; mensajes al usuario, comentarios de negocio y documentación en español.
- Metodología SDD: la spec manda. No se implementa nada que no esté en la spec activa; si falta una decisión, se detiene y se pregunta. Los cambios se documentan primero.
- Una tarea a la vez (`tasks.md`), con tests primero. Una tarea termina con sus tests en verde, y no se avanza con tests en rojo.
- Dinero: siempre `decimal.js` y columnas `DECIMAL`; nunca `number` ni `float`.
- El ledger es de solo inserción: nunca se actualiza ni se borra un asiento.
- Base de datos: MySQL 8 (InnoDB). Mismo motor en desarrollo, pruebas y producción.
- Nunca guardar secretos en el repositorio ni en logs.
- Comandos: `pnpm test`, `pnpm lint`, `pnpm format:check`, `pnpm typecheck`.
