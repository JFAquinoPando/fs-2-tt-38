import { Router } from "express";
import { mostrarTodo, crearUsuario, loginUsuario, detalleUsuario, quitarUsuario, actualizarUsuario } 
    from "../controladores/UsuarioController.js";
import { autenticar_jwt } from "../middlewares/autenticacionJWT.js";



export const UsuarioRuta = Router()




UsuarioRuta.get("/", mostrarTodo)
UsuarioRuta.get("/:id", detalleUsuario)
UsuarioRuta.post("/", autenticar_jwt, crearUsuario)
UsuarioRuta.post("/login", loginUsuario)
UsuarioRuta.delete("/:id", autenticar_jwt, quitarUsuario)
UsuarioRuta.put("/:id", autenticar_jwt,  actualizarUsuario)