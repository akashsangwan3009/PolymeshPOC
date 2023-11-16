import { getAccountDID } from "../backend/Account/AccountDetails.js";

export const getAsset=async(apiClient,ticker)=>{
    return await apiClient.assets.getAsset({
        ticker
    });
}

export const isTickerAvailable=async(apiClient, ticker)=>{
    return await apiClient.assets.isTickerAvailable({
        ticker
    });
}


export const createAsset=async(tickerReservor, name, assestType, isDivisible)=>{
    const assestQueue=await tickerReservor.createAsset({
        name,
        assestType,
        isDivisible
    })

    const asset=await assestQueue.run();
    return asset;
}


export const getTickerReservation=async(apiClient, ticker)=>{
    return apiClient.assests.getTickerReservation({
        ticker
    })
}


export const createAssetCompliance=async(asset, primaryAccountApi)=>{
    const primaryAccountDID= await getAccountDID(primaryAccountApi);
    const assetRequirements= getAssetRequirements(asset);
    
    const setRequirementsQueue=await assetRequirements.set({
        requirements: [
            [
              {
                target: 'Sender',
                type: 'IsExternalAgent',
              },
            ],
            [
              {
                target: 'Receiver',
                type: 'IsPresent',
                claim: {
                  type: 'KnowYourCustomer',
                  scope: {
                    type: 'Ticker',
                    value: asset.ticker,
                  },
                },
                trustedClaimIssuers: [
                  {
                    identity: primaryAccountDID,
                    trustedFor: ['KnowYourCustomer'],
                  },
                ],
              },
              {
                target: 'Receiver',
                type: 'IsAbsent',
                claim: {
                  type: 'Jurisdiction',
                  code: 'Li',
                  scope: {
                    type: 'Ticker',
                    value: asset.ticker,
                  },
                },
                trustedClaimIssuers: [
                  {
                    identity: primaryAccountDID,
                    trustedFor: ['Jurisdiction'],
                  },
                ],
              },
            ],
          ],  
    });

    const updatedAsset = await setRequirementsQueue.run();
}

export const getAssetRequirements=(assest)=>{

    const assestCompliance=assest.compliance;
    return assestCompliance.requirements;

}