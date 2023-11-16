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
          const signingIdentity = await this.polymeshService.polyClient.getSigningIdentity();
          console.log(await signingIdentity.assetPermissions.checkPermissions({
            asset
          }));    
        } catch (error) {
           alert(error);
        }  
      }
    }



}
