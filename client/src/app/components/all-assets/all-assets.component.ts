import { Component } from '@angular/core';
import {PolymeshService} from "../../service/polymesh.service"
import {LoadingService} from "../../service/loading.service"

@Component({
  selector: 'app-all-assets',
  templateUrl: './all-assets.component.html',
  styleUrls: ['./all-assets.component.css']
})
export class AllAssetsComponent {

  constructor(public polymeshService:PolymeshService, public loadingService:LoadingService){}

  async getAssetDetails(asset:any){
    try {
      this.loadingService.showLoading();
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
        assetSecAgent:false,
        removeAgent:false,
      };
    } catch (error) {
      alert(error)
    }finally{
      this.loadingService.hideLoading();
    }
  }

}
