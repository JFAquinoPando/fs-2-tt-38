import { Router } from "express";
import { mostrarTodo, reservar, detalleReserva, quitarReserva, actualizarReserva } 
    from "../controladores/ReservaController.js";
import { autenticar_jwt } from "../middlewares/autenticacionJWT.js";


export const ReservaRuta = Router()




ReservaRuta.get("/", mostrarTodo)
ReservaRuta.get("/:id", detalleReserva)
ReservaRuta.post("/", autenticar_jwt, reservar)
ReservaRuta.delete("/:id", autenticar_jwt, quitarReserva)
ReservaRuta.put("/:id", autenticar_jwt, actualizarReserva)