import express from "express";
import { createAssetController } from "../Controllers/assetController.js";

const assetRouter=express();


assetRouter.route("/").post(createAssetController);



export default assetRouter;