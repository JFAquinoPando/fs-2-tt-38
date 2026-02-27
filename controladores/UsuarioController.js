import * as z from "zod"
import { Usuario } from "./../modelos/UsuarioModelo.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

let usuarios = [
    {
        nombre: "Juan",
        correo: "test@test.com",
        clave: "aqui_debe_estar_encriptado"
    }
]

const { CLAVE_JWT } = process.env

export const mostrarTodo = async function (peticion, respuesta) {
    try {
        const usuarios = await Usuario.find({})
        respuesta.send(usuarios)
    } catch (error) {
        console.error("Chester, tenemos un problema: ", error);
        respuesta.status(500).json({
            mensaje: "El servidor no responde correctamente, vuelva a intentarlo en unos minutos"
        })

    }
}

export async function crearUsuario(peticion, respuesta) {
    const {
        nombre,
        email,
        contrasenha
    } = peticion.body

    try {
        const nuevoUsuario = new Usuario({
            nombre,
            correo: email,
            clave: contrasenha
        })

        const resultado = await nuevoUsuario.save()
        respuesta.status(201).json(resultado)
    } catch (error) {
        console.error("SALVEN A LOS NIÑOS... El servidor no soporta la petición", error);
        let faltantes = []


        const objetoPrincipal = error.errors
        for (const clave in objetoPrincipal) {
            faltantes.push(`Encontrado: ${objetoPrincipal[clave]} `)
        }
        /* error.errors.lugar.path */
        respuesta.status(403).json({ sms: "Seguro que algo falló", algo: faltantes })
    }
}

export const loginUsuario = async (peticion, respuesta) => {
    const { correo, clave } = peticion.body
    console.log({correo, clave});
    
    const { sign } = jwt
    const usuarioEncontrado = await Usuario.findOne({correo})
    console.log("test");
    console.log(usuarioEncontrado);
    
    if (!usuarioEncontrado) {
        return respuesta.status(400).json({
            mensaje: "Credenciales inválidaas"
        })
    }
    if (usuarioEncontrado.clave == clave) {
        const token = sign({
            id: usuarioEncontrado._id,
            correo: usuarioEncontrado.correo
        },CLAVE_JWT, {
            expiresIn: "3600s"
        } )
        return respuesta.status(200).json({
            "mensaje": "login exitoso",
            "token": token
        })
    }

}







/* Falta */

export const detalleReserva = async (peticion, respuesta) => {
    const { id } = peticion.params
    try {
        const reserva = await Reserva.findOne({ _id: id })
        respuesta.send(reserva)
    } catch (error) {
        console.error("Chester, tenemos un problema: ", error);
        respuesta.status(404).json({
            mensaje: "La reserva no fue encontrada"
        })

    }

}
export const quitarReserva = async (peticion, respuesta) => {
    const { id } = peticion.params

    await Reserva.deleteOne({ _id: id })

    respuesta.send({
        mensaje: `Reserva #${id} eliminada`
    })

}

export const actualizarReserva = async (peticion, respuesta) => {
    const { id } = peticion.params

    try {

        const {
            lugar,
            solicitante,
            fecha_ini,
            fecha_fin,
            hora_ini,
            hora_fin
        } = peticion.body

        await Reserva.updateOne({ _id: id }, {
            $set: {
                lugar: lugar,
                nombre: solicitante,
                fechaInicio: fecha_ini,
                fechaFin: fecha_fin
            }
        })

        respuesta.send(
            {
                mensaje: `Reserva #${id} modificada`
            }
        )
    } catch (error) {

    }
}