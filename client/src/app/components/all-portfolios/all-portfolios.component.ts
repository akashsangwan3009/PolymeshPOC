import { Component } from '@angular/core';
import {PolymeshService} from "../../service/polymesh.service"

@Component({
  selector: 'app-all-portfolios',
  templateUrl: './all-portfolios.component.html',
  styleUrls: ['./all-portfolios.component.css']
})
export class AllPortfoliosComponent {

  portfolioDetailsToggle:boolean=false;
  portfolioName:string="";
  portfolioAssets:any[]=[];

  constructor(public polymeshService:PolymeshService){}

  enablePortfolioDetailToggle(){
    if(!this.portfolioDetailsToggle){
      this.portfolioDetailsToggle=true;
    }
  }

  async getPortfolioDetail(porfolio:any){
   this.portfolioName=porfolio.name?porfolio.name:"Default";
   this.portfolioAssets=await porfolio.getAssetBalances();
   if(this.portfolioAssets.length==0){
    alert("This Portfolio doesn't contain any asset !!");
    this.portfolioDetailsToggle=false;
   }
  }
}
