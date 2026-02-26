import mongoose from "mongoose";
import "dotenv/config";

// const url = "mongodb://localhost:27017";
// const baseDatos = "idt";

/* export const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✓ Conectado a MongoDB");
    } catch (error) {
        console.error("✗ Error al conectar a MongoDB:", error.message);
        process.exit(1);
    }
}; */
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("❌ Falta la variable MONGO_URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const conectarDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      console.log("✓ Conectado a MongoDB");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default mongoose;

/* mongoose.set("bufferCommands", false);

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

    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        throw new Error("La variable de entorno MONGO_URI no esta definida.");
    }

    estadoConexionGlobal.promesa = null;

    estadoConexionGlobal.promesa = mongoose
        .connect(MONGO_URI, {
            dbName: "test",
            serverSelectionTimeoutMS: 25000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 15000,
        })
        .catch((error) => {
            estadoConexionGlobal.promesa = null;
            estadoConexionGlobal.conexion = null;
            throw error;
        });

    estadoConexionGlobal.conexion = await estadoConexionGlobal.promesa;
    return estadoConexionGlobal.conexion;
};
 */