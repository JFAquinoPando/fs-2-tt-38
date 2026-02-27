import mongoose from "mongoose";
import { required } from "zod/mini";

const usuarioEsquema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    clave: {
        type: String,
        required: true
    }
})



export const Usuario = mongoose.model("Usuario", usuarioEsquema)