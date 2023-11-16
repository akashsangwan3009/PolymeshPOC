import { getAccountAssets } from "./AccountAssests"

export const transferAssetOwnership=async(ticker, newAccountDID, oldAccountApi )=>{

    const assest=await getAccountAssets(oldAccountApi, ticker);
    const transferQueue=await assest.transferOwnership({
        target:newAccountDID
    });

    await transferQueue.run();
}

