import { Component } from '@angular/core';
import {PolymeshService} from "../../service/polymesh.service"

@Component({
  selector: 'app-all-assets',
  templateUrl: './all-assets.component.html',
  styleUrls: ['./all-assets.component.css']
})
export class AllAssetsComponent {

  constructor(public polymeshService:PolymeshService){}

  async getAssetDetails(asset:any){
    
    await this.polymeshService.getAssetDetails(asset);
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
      assetDetails:true,
    };
  }

}
