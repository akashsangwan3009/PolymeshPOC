import { Polymesh } from '@polymeshassociation/polymesh-sdk';
import { LocalSigningManager } from '@polymeshassociation/local-signing-manager';


const getSigningManagerAdmin=async(mnemonic)=>{

    const signingManagerAdmin=await LocalSigningManager.create({
        accounts:[
         {
             mnemonic
         },   
        ]
    })
    
    return signingManagerAdmin;
};

export const connectToPolymesh=async(nodeUrl, mnemonic)=>{

    const signingManager=await getSigningManagerAdmin(mnemonic);
    const apiUser=await Polymesh.connect({
        nodeUrl,
        signingManager
    });

    return apiUser;
}