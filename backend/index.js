import express from "express";
import bodyParser from "body-parser";
import { port } from "./constant.js";
import assetRouter from "./routes/assetsRoutes.js"

const app=express();
app.use(bodyParser.json());


app.use('/',assetRouter)




app.listen(port, ()=>{
  console.log(`App running on port ${port}`);
})