import { Component } from '@angular/core';
import {PolymeshService} from "../../service/polymesh.service"
import {LoadingService} from "../../service/loading.service"
import {NgForm} from "@angular/forms"

@Component({
  selector: 'app-transfer-owner',
  templateUrl: './transfer-owner.component.html',
  styleUrls: ['./transfer-owner.component.css']
})
export class TransferOwnerComponent {

  tranferFormData:any={};
  addSecondaryAccountData:any={};
  setAssetComplianceData:any={};
  setAssetAgentData:any={};
  mintAssetData:any={};
  assetDistributionData:any={}

  constructor(public polymeshService:PolymeshService, private loadService:LoadingService){}

  async transferOnwership(data:NgForm){
    this.tranferFormData=data;
      try {
        this.loadService.showLoading();
        await this.polymeshService.transferOwnerShip(this.tranferFormData.tickerName, this.tranferFormData.pubKey)
        alert("Owner Transfer Succesfully Done !!");
      } catch (error) {
        alert(error)
      } finally{
        this.loadService.hideLoading();
      } 
  }

  async addSecondaryAccount(data:NgForm){
    this.addSecondaryAccountData=data;
    try {
      this.loadService.showLoading();
      await this.polymeshService.addSecondaryAccount(this.addSecondaryAccountData.pubKey)
      alert('Invitation Sent Succesfully')
    } catch (error) {
      alert(error)
    }finally{
      this.loadService.hideLoading();
    }
  }

  async setAssetCompliance(data:NgForm){
    this.setAssetComplianceData=data;
    try {
      this.loadService.showLoading();
      await this.polymeshService.setAssetCompliance(this.setAssetComplianceData.tickername)
      alert('Compliance Sent Succesfully')
    } catch (error) {
      alert(error)
    }finally{
      this.loadService.hideLoading();
    }
  }

  async setAssetAgent(data:NgForm){
    this.setAssetAgentData=data;
    try {
      this.loadService.showLoading();
      await this.polymeshService.setAssetAgent(this.setAssetAgentData.tickername,this.setAssetAgentData.accountAddress )
      alert('Invite Sent Succesfully')
    } catch (error) {
      alert(error)
    }finally{
      this.loadService.hideLoading();
    }
  }

  async callMintAsset(data:NgForm){
    this.mintAssetData=data;
    try {
      this.loadService.showLoading();
      await this.polymeshService.mintAsset(this.mintAssetData.tickername,this.mintAssetData.amount )
      alert('Compliance Sent Succesfully')
    } catch (error) {
      alert(error)
    }finally{
      this.loadService.hideLoading();
    }
  }

  async callAssetDistribution(data:NgForm){
    this.assetDistributionData=data;
    console.log(this.assetDistributionData);
    
    try {
      this.loadService.showLoading();
      await this.polymeshService.distributeAsset(this.assetDistributionData.userDiD,this.assetDistributionData.amount, this.assetDistributionData.tickerName,this.assetDistributionData.portfoliaId )
      alert('Token distribution request Sent Succesfully')
    } catch (error) {
      alert(error)
    }finally{
      this.loadService.hideLoading();
    }
  }

  async setAssetSecAgent(data:NgForm){
    this.setAssetAgentData=data;
    try {
      this.loadService.showLoading();
      await this.polymeshService.setAssetSecondaryAgent(this.setAssetAgentData.tickername,this.setAssetAgentData.accountAddress )
      alert('Invite Sent Succesfully')
    } catch (error) {
      alert(error)
    }finally{
      this.loadService.hideLoading();
    }
  }

  async removeAssetAgent(data:NgForm){
    this.setAssetAgentData=data;
    try {
      this.loadService.showLoading();
      await this.polymeshService.removeAssetAgent(this.setAssetAgentData.tickername,this.setAssetAgentData.accountAddress )
      alert('Invite Sent Succesfully')
    } catch (error) {
      alert(error)
    }finally{
      this.loadService.hideLoading();
    }
  }

  

}

//0xbacb7e59bb46d6cc56bba1008c0a7abdb2da7b2826b81211bc07bda54d494f5e -- Present

//0x0a34ef7e95458932bab6bf9981310858b0f7b9cc84c870f4dae9debdf8d8e027
