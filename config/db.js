import mongoose from "mongoose";
import "dotenv/config";

mongoose.set("bufferCommands", false);

const { MONGO_URI } = process.env;

const estadoConexionGlobal = globalThis.__mongooseEstado ?? {
    conexion: null,
    promesa: null,
};

globalThis.__mongooseEstado = estadoConexionGlobal;

export const conectarDB = async () => {
    if (estadoConexionGlobal.conexion) {
        return estadoConexionGlobal.conexion;
    }

    if (!MONGO_URI) {
        throw new Error("La variable de entorno MONGO_URI no esta definida.");
    }

    if (!estadoConexionGlobal.promesa) {
        estadoConexionGlobal.promesa = mongoose
            .connect(MONGO_URI, {
                serverSelectionTimeoutMS: 15000,
                socketTimeoutMS: 45000,
                connectTimeoutMS: 10000,
            })
            .catch((error) => {
                estadoConexionGlobal.promesa = null;
                throw error;
            });
    }

    estadoConexionGlobal.conexion = await estadoConexionGlobal.promesa;
    return estadoConexionGlobal.conexion;
};
