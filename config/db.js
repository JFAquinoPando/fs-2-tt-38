import mongoose from "mongoose";
import "dotenv/config";

mongoose.set("bufferCommands", false);

const estadoConexionGlobal = globalThis.__mongooseEstado ?? {
    conexion: null,
    promesa: null,
};

globalThis.__mongooseEstado = estadoConexionGlobal;

export const conectarDB = async () => {
    if (
        estadoConexionGlobal.conexion &&
        mongoose.connection.readyState === 1
    ) {
        return estadoConexionGlobal.conexion;
    }

    const MONGO_URI = "mongodb+srv://jfaquinopando_db_user:yqjFu7zxPInR59jH@clausterfullstack.t6i9gun.mongodb.net/test?retryWrites=true&w=majority";

    if (!MONGO_URI) {
        throw new Error("La variable de entorno MONGO_URI no esta definida.");
    }

    estadoConexionGlobal.promesa = null;

    estadoConexionGlobal.promesa = mongoose
        .connect(MONGO_URI, {
            dbName: "test",
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
        })
        .catch((error) => {
            estadoConexionGlobal.promesa = null;
            estadoConexionGlobal.conexion = null;
            throw error;
        });

    estadoConexionGlobal.conexion = await estadoConexionGlobal.promesa;
    return estadoConexionGlobal.conexion;
};
