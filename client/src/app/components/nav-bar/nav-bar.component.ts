import { Component } from '@angular/core';
import {PolymeshService} from "../../service/polymesh.service";
import {LoadingService} from "../../service/loading.service"

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(  private polymeshService: PolymeshService, 
                private loader:LoadingService){}


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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:false,
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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:false,
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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:false,
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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:false,
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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:false,
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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:false,
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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:false,
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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:false,
        };
        break;
      
      case 'assetSecAgent':
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
          assetDetails:false,
          assetSecAgent:!this.polymeshService.enablePopUp.assetSecAgent,
          removeAgent:false,
        };
        break;  
      
      case 'removeAgent':
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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:!this.polymeshService.enablePopUp.removeAgent,
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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:false,
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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:false,
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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:false,
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
          assetDetails:false,
          assetSecAgent:false,
          removeAgent:false,
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
        assetDetails:false,
        assetSecAgent:false,
        removeAgent:false,
      };

      this.polymeshService.runTest()
      break; 

    }
  }


  getPublicKey(){
    this.polymeshService.getPublicKey();
  }
                            

}
