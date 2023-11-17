import { Component } from '@angular/core';
import {PolymeshService} from "../../service/polymesh.service"

@Component({
  selector: 'app-get-asset',
  templateUrl: './get-asset.component.html',
  styleUrls: ['./get-asset.component.css']
})
export class GetAssetComponent {

  tickerName:string='';
  asset:any;
  constructor(
    public polymeshService:PolymeshService
    ){}


    async getAsset(){
      if(this.tickerName){
        try {
          const asset=await this.polymeshService.getAsset(this.tickerName);
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
        } catch (error) {
           alert(error);
        }  
      }
    }



}
