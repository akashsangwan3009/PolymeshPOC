export const getPublicKey=async(apiClient,signingAddress)=>{

    const accountDetails=await getAccountDetails(apiClient, signingAddress);
    return accountDetails.key;

}

export const getSigningAddress=async(apiClient)=>{
    const address=await apiClient.accountManagement;
    return address.context.signingAddress;
};


export const getAccountTickerAssets=async(apiClient,ticker)=>{
    const assest=await apiClient.assets.getAsset({
        ticker
    });

    return assest;
};

export const getAccountDID=async(apiClient)=>{
    const signingIdentity=await apiClient.getSigningIdentity();
    return signingIdentity.did
};

const getAccountDetails=async(apiClient,signingAddress)=>{

    const accountDetails=await apiClient.accountManagement.getAccount({
        address:signingAddress
    })

    return accountDetails;
};


export const addSecondaryAccount=async(secondaryAccountPubKey, primaryAccountApi)=>{
    await primaryAccountApi.accountManagement.inviteAccount({
        targetAccount: secondaryAccountPubKey
    });
};


export const acceptAuthorizationRequest=async(apiClient, signingAddress, requestorDID)=>{
   const pendingAuthorizationRequests= await getAccountAuthorizationsRequests(apiClient, signingAddress);
   
   const requestorAuthorization= pendingAuthorizationRequests.find((pendingAuthorization)=>{
        pendingAuthorization.issuer.did === requestorDID
   });

   if(requestorAuthorization){
    const acceptQueue=await requestorAuthorization.accept();
    await acceptQueue.run();
   }

};


export const getAccountAuthorizationsRequests=async(apiClient, signingAddress)=>{

    const account= await getAccountDetails(apiClient, signingAddress);
    return await account.authorizations.getReceived();

};