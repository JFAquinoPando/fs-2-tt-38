import {connect} from "mongoose";
import "dotenv/config"

export const conectarDB = async () => {
    try {
        const { MONGO_URI } = process.env

       await connect(MONGO_URI)
       console.log("conexión a MongoDB Atlas correcto 🫡");
       
       
    } catch (error) {
        console.error("Lo lamento, tenemos un error 💔");
        process.exit(1)
    }
}