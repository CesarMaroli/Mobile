import  Express  from "express";
import { listaUser } from "../controller/controller_user.js";


const rotas_user = Express.Router()

rotas_user.get('/listauser', listaUser )



export{rotas_user}