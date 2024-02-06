import { Component } from '@angular/core';
import {PolymeshService} from '../../service/polymesh.service'
import {LoadingService} from "../../service/loading.service"
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-token',
  templateUrl: './create-token.component.html',
  styleUrls: ['./create-token.component.css']
})
export class CreateTokenComponent {

    tokenDetail:any={};

    constructor( 
          public polymeshService:PolymeshService, 
          private loader:LoadingService) {} 

    async createAsset(data:NgForm){
      this.tokenDetail=data;
      if(this.tokenDetail.ticker){         
          if(await this.isTickerAvaiable(this.tokenDetail.ticker)){
            this.loader.showLoading();

            const asset=await this.polymeshService.createToken(
              this.tokenDetail.ticker,
              this.tokenDetail.token,
              this.tokenDetail.assetType,
              this.tokenDetail.isDivisible);

            this.loader.hideLoading();

            if(asset){
              alert('Token Created SuccessFully!!');
            }

          }else{
            alert("Ticker Already Reserved")
          }
      }
      
    }

    async alertIfTickerAvaiable(ticker:string){
      try {
        if(await this.isTickerAvaiable(ticker)){
          alert('Ticker Available');
        }else{
          alert("Ticker Already Reserved")
        }
      } catch (error) {
          alert(error) 
      }
    }

    async isTickerAvaiable(ticker:string):Promise<boolean>{
      return await this.polymeshService.polyClient.assets.isTickerAvailable({
        ticker
      }) 
    }


}
