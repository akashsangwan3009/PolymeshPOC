import { Injectable } from '@angular/core';
import { BigNumber, Polymesh } from '@polymeshassociation/polymesh-sdk';
import { BrowserExtensionSigningManager } from '@polymeshassociation/browser-extension-signing-manager';
import {LoadingService} from "./loading.service"
import {SettlementTx,ExternalAgentsTx,AssetTx} from "@polymeshassociation/polymesh-sdk/types"


@Injectable({
  providedIn: 'root'
})
export class PolymeshService {

  constructor(private loader:LoadingService) {}

  polyClient:any;
  signingAddress:any;
  accountAuthRequest:any=[];
  tokenTransferPendingRequests:any=[];
  tokenTransferAffirmedRequests:any=[];
  tokenTransferFailedRequests:any=[];
  allPortfolios:any[]=[];
  singingIdentity:any;

  enablePopUp:{ createToken: boolean, 
                getAsset: boolean, 
                getAllAssets: boolean, 
                getAuthRequest: boolean,
                getTransferRequest:boolean,
                transferOwner:boolean,
                addSecondaryAccount:boolean,
                assetCompliance:boolean,
                assetAgent:boolean,
                mintAsset:boolean,
                assetDistribution:boolean ,
                porfolios:boolean
              } = { 
                       createToken:false, 
                       getAsset:false, 
                       getAllAssets:false, 
                       getAuthRequest:false,
                       transferOwner:false,
                       addSecondaryAccount:false,
                       assetCompliance:false,
                       assetAgent:false,
                       mintAsset:false,
                       assetDistribution:false,  
                       getTransferRequest:false,
                       porfolios:false,
                      };
  accountAllAssets:any=[];

  async connectWallet(){
    const signingManager = await BrowserExtensionSigningManager.create(
      {
        appName:"STO"
      }
    ); 
    this.polyClient = await Polymesh.connect({
    nodeUrl: 'wss://testnet-rpc.polymesh.live',
    signingManager,
    });
    
    this.singingIdentity=await this.polyClient.getSigningIdentity();
  }

  async inviteOwner(pubId:String){
      await this.polyClient.accountManagement.inviteAccount({
        targetAccount:pubId
      });
  }

  async getAuthrorizationRequests(){
      try {
        // const userAccount= await this.getAccountDetails(await this.getSigningAddress())
        // const authObject=await this.singingIdentity;
        // this.signingAddress=authObject.did;
        // console.log('UserAccount', userAccount,  this.signingAddress);
        // console.log('user Request',  await userAccount.authorizations.getReceived());
        this.accountAuthRequest= await this.singingIdentity.authorizations.getReceived();  

        if(this.accountAuthRequest.length==0){
          alert("No Pending Auth Request")
        }
      } catch (error) {
         alert(error);
      }
  }

  async getAllTransferRequest(){
    try {
      this.loader.showLoading();
      const tokenTransferRequests=await this.singingIdentity.getInstructions();
      this.tokenTransferAffirmedRequests=tokenTransferRequests.affirmed;
      this.tokenTransferPendingRequests=tokenTransferRequests.pending;
      this.tokenTransferFailedRequests=tokenTransferRequests.failed;
      console.log(await this.tokenTransferFailedRequests[0]);
      
    } catch (error) {
      alert(error)
    } finally{
      this.loader.hideLoading();
    }
  }

  async pendingRequest(request:any){
    const acceptQueue=await request.accept();
    await acceptQueue.run();
  }

  async getSigningAddress(){
    const address=await this.polyClient.accountManagement;
    return address.context.signingAddress;
  };

  async getAsset(tickerName:String){
   
      const asset =await this.polyClient.assets.getAsset({
        ticker:tickerName
      })
     return(asset);
  };

  async getAllAssets(){
    try {
      const assets =await this.polyClient.assets.getAssets()  
      this.accountAllAssets= assets;
      if(this.accountAllAssets.length == 0){
        alert("No token for Selected account !!");
      }
    } catch (error) {
       alert(error);
    }
  };

  async createToken(ticker:string, name:string, assetType:string, isDivisible:boolean){
    try {
      const reservationQueue = await this.polyClient.assets.reserveTicker({
        ticker,
      });
  
      const reservation=await reservationQueue.run();
  
      const assetQueue=await reservation.createAsset({
        name,
        assetType,
        isDivisible
      })
  
      const asset =await assetQueue.run();

      return asset;
      
    } catch (error) {
        alert(error); 
    }
  };


  async isTickerAvaiable(ticker:string):Promise<boolean>{
    return await this.polyClient.assets.isTickerAvailable({
      ticker
    }) 
  };

  async getAccountDetails(signingAddress:any){
    const accountDetails=await this.polyClient.accountManagement.getAccount({
      address:signingAddress
  })

  return accountDetails;
  }

  async getPublicKey(){
    const accountdetails=await this.getAccountDetails(await this.getSigningAddress())
    alert(accountdetails.address);
  }

  async transferOwnerShip(tickerName:string, pubKey:string){
    const asset = await this.polyClient.assets.getAsset({
      ticker: tickerName,
    });
    if(asset){
      const transferQueue = await asset.transferOwnership({
        target: pubKey,
      });
  
      await transferQueue.run();
    }
  }

  isValidAddress(address:string){
    return this.polyClient.accountManagement.isValidAddress({
      address
    })
  }

  async addSecondaryAccount(pubKey:string){
    await this.polyClient.accountManagement.inviteAccount({
      targetAccount: pubKey,
    });
  }

  async setAssetCompliance(tickerName:string){
      const asset=await this.getAsset(tickerName)
      if(asset){
        const assetCompliance= asset.compliance;
        const assetRequirements= assetCompliance.requirements;
        const setRequirementsQueue = await assetRequirements.set({
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
                    identity: this.singingIdentity.did,
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
                    identity: this.singingIdentity.did,
                    trustedFor: ['Jurisdiction'],
                  },
                ],
              },
            ],
          ],
        });
        const updatedAsset = await setRequirementsQueue.run();
      }
  }

  async setAssetAgent(tickerName:string, targetAddress:string){
    const asset=await this.getAsset(tickerName);
    const identity=await this.polyClient.identities.getIdentity({
      did:targetAddress
    })
    const invitedAgent=await asset.permissions.inviteAgent({
      target:identity,
      permissions:{
        transactions:'inclusive',
        value:["asset.controllerTransfer"]
      }
    })
  }


  async mintAsset(tickerName:string, amount:string){
    const asset=await this.getAsset(tickerName);
      const issuance = asset.issuance;
    const issueQueue = await issuance.issue({
      amount: new BigNumber(amount),
    });
    await issueQueue.run();
  }

  async distributeAsset(userAccount:string, amount:string,tickerName:string, portfoliaID:string){
    
    const ownerDefaultPortfolia=await this.singingIdentity.portfolios.getPortfolio();
    const userIdentity = await this.polyClient.identities.getIdentity({
      did: userAccount,
    });
    
    let userPortfolio;

    if(portfoliaID.length>0){
        userPortfolio=await userIdentity.portfolios.getPortfolio({
          portfolioId: new BigNumber(portfoliaID),
        });
    }else{
      userPortfolio=await userIdentity.portfolios.getPortfolio();
      console.log('Check',userPortfolio);
      
    }

    const asset=await this.getAsset(tickerName);

    console.log('ownerPortfolio',ownerDefaultPortfolia, 'user', await userIdentity.portfolios.getPortfolio(), 'portfoliaID', portfoliaID, 'lenght', portfoliaID.length);
    

    // const canTranferCheck = await asset.settlements.canTransfer({
    //   from: ownerDefaultPortfolia,
    //   to: userPortfolio,
    //   amount:new BigNumber(amount),
    // });

    // if(canTranferCheck.result){
    //   const moveQueue = await ownerDefaultPortfolia.moveFunds({
    //     items: [
    //       {
    //         asset: 'ACME',
    //         amount: new BigNumber('1000'),
    //       },
    //     ],
    //     to: userPortfolio,
    //   });

    //   await moveQueue.run();
    // }


    const distributionVenueQueue = await this.polyClient.settlements.createVenue({
      type: 'Distribution',
      description: 'For ACME Co',
    });
      
    const distributionVenue = await distributionVenueQueue.run();

    const distributionInstructionQueue = await distributionVenue.addInstruction({
      legs: [
        {
          amount: new BigNumber(amount),
          from: ownerDefaultPortfolia,
          to: userPortfolio,
          asset: asset,
        },
      ],
    });

    const distributionInstruction = await distributionInstructionQueue.run();
    const distributionInstructionId = distributionInstruction
    const distributionVenueId = distributionVenue.id.toString();

    console.log('distributionInstructionId', distributionInstructionId);
    console.log('distributionVenueId', distributionVenueId);
  }

  async getVenue(){
    const userAccount= await this.getAccountDetails(await this.getSigningAddress())
    console.log(await this.singingIdentity.getInstructions());
    console.log(await this.singingIdentity.authorizations);
    console.log( await userAccount.authorizations);
  }

  async getAllPortfolios(){
    this.loader.showLoading();
    this.allPortfolios=await this.singingIdentity.portfolios.getPortfolios()
    this.allPortfolios.map(async (portfolio:any)=>{
      if(portfolio.hasOwnProperty("id")){
        portfolio.name = await portfolio.getName();
      }
    })
    this.loader.hideLoading();
  }

  async getAssetAgents(){
    const asset=await this.getAsset("AKS");
    
   console.log(await this.singingIdentity.assetPermissions.checkPermissions({
    asset:"AKS",
    transactions:[AssetTx]
   }));
   
    
  }

}
