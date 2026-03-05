import rapido from "express";
import permitirIntercambioDeRecursos from "cors";
import { ReservaRuta } from "./rutas/ReservaRoutes.js";
import { UsuarioRuta } from "./rutas/UsuarioRutas.js";
import { MongoClient, ServerApiVersion } from "mongodb";
import { conectarDB } from "./config/db.js";
const app = rapido()


app.use(permitirIntercambioDeRecursos())
app.use(rapido.urlencoded({extended: true}))
app.use(rapido.json())

conectarDB()

app.get("/", (peticion, respuesta) => {
    respuesta.send("Hola, de momento 😀")
})

app.use("/reservas", ReservaRuta)
app.use("/usuarios", UsuarioRuta)

export default app