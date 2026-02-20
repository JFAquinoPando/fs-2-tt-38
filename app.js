import rapido from "express";
import permitirIntercambioDeRecursos from "cors";
import { ReservaRuta } from "./rutas/ReservaRoutes.js";
import { MongoClient, ServerApiVersion } from "mongodb";

const app = rapido()

app.use(permitirIntercambioDeRecursos())
app.use(rapido.urlencoded({extended: true}))


app.get("/", (peticion, respuesta) => {
    respuesta.send("Hola, de momento 😀")
})

app.use("/reservas", ReservaRuta)

app.get("/mongo", async (peticion, respuesta) => {
    const uri = "mongodb+srv://jfaquinopando_db_user:yqjFu7zxPInR59jH@clausterfullstack.t6i9gun.mongodb.net/?appName=clausterFullStack";
    
    if (!uri) {
        return respuesta.status(500).json({ error: "MONGO_URI no definida" });
    }

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        await client.db("test").command({ ping: 1 });
        const reservas = await client.db("test").collection("reservas").find({}).toArray();
        respuesta.json({
            mensaje: "Conexión exitosa a MongoDB",
            reservas
        });
    } catch (error) {
        console.error("Error en /mongo:", error);
        respuesta.status(500).json({ error: error.message });
    } finally {
        await client.close();
    }
})

export default app

