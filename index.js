import 'dotenv/config';
import app from "./app.js";
import { conectarDB } from './config/db.js';

const { PUERTO } = process.env

console.log(PUERTO);

await conectarDB()

app.listen(PUERTO, () => {
    console.log(`Hola estamos escuchando la app desde el puerto ${PUERTO}: http://localhost:${PUERTO}`);
})