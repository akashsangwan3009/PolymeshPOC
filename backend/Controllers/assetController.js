// import { isTickerAvailable } from "../Asset/AccountAssests.js";

export const createAssetController=(req, res)=>{
    const {assetName, tickerReservor, assetType, isDivisible}=req.body;



    res.status(200).json({
        success:true
    });
}