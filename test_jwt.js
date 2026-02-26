import jwt from "jsonwebtoken";

const {sign ,verify} = jwt

/* const carga = {
    contenido: "hol@"
} 

const token = sign(carga, "secreto123", {
    expiresIn: "300s"
}) */


const tokenResultante = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW5pZG8iOiJob2xAIiwiaWF0IjoxNzcyMTQ1MDI5LCJleHAiOjE3NzIxNDUzMjl9.fwgt0jesZokAuYCHCbqr8BvYJCirfn3zWfWNk1kyfxY"

verify(tokenResultante, "secreto123", function (error, decodificado) {
    if (error) {
        console.log("Tenemos un error", error);
    }
    console.log("Decodificado?", decodificado);
    
} )

//console.log("Token", token);




/* 

C:\xampp\htdocs\fs-2-tt-38>node test_jwt.js
Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW5pZG8iOiJob2xAIiwiaWF0IjoxNzcyMTQ0OTk1LCJleHAiOjE3NzIxNDUyOTV9.HxB-e9AIAjZ_ylJtRyUvhU9QwqD-Y0t0KpPhEpNT1LA

C:\xampp\htdocs\fs-2-tt-38>node test_jwt.js
Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb250ZW5pZG8iOiJob2xAIiwiaWF0IjoxNzcyMTQ1MDI5LCJleHAiOjE3NzIxNDUzMjl9.fwgt0jesZokAuYCHCbqr8BvYJCirfn3zWfWNk1kyfxY

*/