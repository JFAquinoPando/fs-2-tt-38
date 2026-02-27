import jwt from "jsonwebtoken";
import "dotenv/config";

export const autenticar_jwt = (peticion, respuesta, siguienteFuncion) => {
    try {
        const authToken = peticion.headers.authorization

        console.log("token?", authToken);
        

        const token = authToken.split(" ")[1]
        const decodificado = jwt.verify(token, process.env.CLAVE_JWT)
        peticion.usuario = decodificado
        siguienteFuncion()
    } catch (error) {
        console.log("Tremendo error de autenticación", error);
        return respuesta.status(400).json({mensaje: "Token inválido... revisar"})
    }
}