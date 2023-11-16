import { AfterViewInit, Component } from '@angular/core';
import {PolymeshService} from "./service/polymesh.service"
import {LoadingService} from "./service/loading.service"
import {Buffer} from 'buffer'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  title = 'STO With Polymesh';
  signingAddress:string='';
  stoCreationPop:boolean=false;
  getAssetPop:boolean=false;

  constructor(
    private polymeshService: PolymeshService, 
    private loader:LoadingService,
    ){}
  
  ngOnInit():void{
    global.Buffer = global.Buffer || Buffer;
    this.stoCreationPop=this.polymeshService.enablePopUp.createToken;
    this.connectWallet()
  }
  
  async connectWallet(){
    this.loader.showLoading();
    await this.polymeshService.connectWallet();
    await this.ready();
    this.loader.hideLoading();
  }

  async ready(){
    if(this.polymeshService.polyClient){
      const authObject=await this.polymeshService.polyClient.getSigningIdentity();
      this.signingAddress=authObject.did;
    }
  }

  async togglePopUp(type:string){
    switch(type){

      case 'sto':
        this.polymeshService.enablePopUp={
          createToken:!this.polymeshService.enablePopUp.createToken,
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
        }
        break;

      case 'getAsset':
        this.polymeshService.enablePopUp={
          createToken:false,
          getAsset:!this.polymeshService.enablePopUp.getAsset,
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
        break;

      case 'getAllAssets':
        this.polymeshService.enablePopUp={
          createToken:false,
          getAsset:false,
          getAllAssets:!this.polymeshService.enablePopUp.getAllAssets,
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
       
        if(this.polymeshService.enablePopUp.getAllAssets){
           this.polymeshService.getAllAssets();
         }  
        break;

      case 'getAllAuth':
        this.polymeshService.enablePopUp={
          createToken:false,
          getAsset:false,
          getAllAssets:false,
          getAuthRequest:!this.polymeshService.enablePopUp.getAuthRequest,
          transferOwner:false,
          addSecondaryAccount:false,
          assetCompliance:false,
          assetAgent:false,
          mintAsset:false,
          assetDistribution:false,
          getTransferRequest:false,
          porfolios:false,
        };
    
        if(this.polymeshService.enablePopUp.getAuthRequest){
          await this.polymeshService.getAuthrorizationRequests()
        }
        break;

      case 'transferOwner':
        this.polymeshService.enablePopUp={
          createToken:false,
          getAsset:false,
          getAllAssets:false,
          getAuthRequest:false,
          transferOwner:!this.polymeshService.enablePopUp.transferOwner,
          addSecondaryAccount:false,
          assetCompliance:false,
          assetAgent:false,
          mintAsset:false,
          assetDistribution:false,
          getTransferRequest:false,
          porfolios:false,
        };
        break;

      case 'addSecondaryAccount':
        this.polymeshService.enablePopUp={
          createToken:false,
          getAsset:false,
          getAllAssets:false,
          getAuthRequest:false,
          transferOwner:false,
          addSecondaryAccount:!this.polymeshService.enablePopUp.addSecondaryAccount,
          assetCompliance:false,
          assetAgent:false,
          mintAsset:false,
          assetDistribution:false,
          getTransferRequest:false,
          porfolios:false,
        };
        break;

      case 'assetCompliance':
        this.polymeshService.enablePopUp={
          createToken:false,
          getAsset:false,
          getAllAssets:false,
          getAuthRequest:false,
          transferOwner:false,
          addSecondaryAccount:false,
          assetCompliance:!this.polymeshService.enablePopUp.assetCompliance,
          assetAgent:false,
          mintAsset:false,
          assetDistribution:false,
          getTransferRequest:false,
          porfolios:false,
        };
        break; 

      case 'assetAgent':
        this.polymeshService.enablePopUp={
          createToken:false,
          getAsset:false,
          getAllAssets:false,
          getAuthRequest:false,
          transferOwner:false,
          addSecondaryAccount:false,
          assetCompliance:false,
          assetAgent:!this.polymeshService.enablePopUp.assetAgent,
          mintAsset:false,
          assetDistribution:false,
          getTransferRequest:false,
          porfolios:false,
        };
        break; 
        
      case 'mintAsset':
        this.polymeshService.enablePopUp={
          createToken:false,
          getAsset:false,
          getAllAssets:false,
          getAuthRequest:false,
          transferOwner:false,
          addSecondaryAccount:false,
          assetCompliance:false,
          assetAgent:false,
          mintAsset:!this.polymeshService.enablePopUp.mintAsset,
          assetDistribution:false,
          getTransferRequest:false,
          porfolios:false,
        };
        break;

      case 'assetDistribution':
        this.polymeshService.enablePopUp={
          createToken:false,
          getAsset:false,
          getAllAssets:false,
          getAuthRequest:false,
          transferOwner:false,
          addSecondaryAccount:false,
          assetCompliance:false,
          assetAgent:false,
          mintAsset:false,
          assetDistribution:!this.polymeshService.enablePopUp.assetDistribution,
          getTransferRequest:false,
          porfolios:false,
        };
        break;
        
      case 'getAllTransfer':
        this.polymeshService.enablePopUp={
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
          getTransferRequest:!this.polymeshService.enablePopUp.assetDistribution,
          porfolios:false,
        };

        if(this.polymeshService.enablePopUp.getTransferRequest){
          await this.polymeshService.getAllTransferRequest()
        };
        break;
      
      case 'porfolios':
        this.polymeshService.enablePopUp={
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
          porfolios:!this.polymeshService.enablePopUp.porfolios,
        };
        if(this.polymeshService.enablePopUp.porfolios){
          await this.polymeshService.getAllPortfolios()
        };
        break;  

      default: 
      this.polymeshService.enablePopUp={
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

      this.polymeshService.getAssetAgents()
      break; 

    }
  }

  getPublicKey(){
    this.polymeshService.getPublicKey();
  }

}
