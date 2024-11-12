import Express from "express";
import cors from "cors";
import {rotas} from "./rotas/routers_auth.js";
import { rotas_user } from "./rotas/routers_users.js";
const app = Express()
app.use(Express.json())
app.use(cors())
app.use('/autenticacao', rotas)
app.use('/adm', rotas_user)





app.listen(8000)
//import { criarTabelas } from "./db.js";
//criarTabelas()