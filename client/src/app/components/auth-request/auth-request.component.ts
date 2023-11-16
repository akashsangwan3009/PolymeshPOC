import { Component } from '@angular/core';
import {PolymeshService} from "../../service/polymesh.service"
import { LoadingService } from "../../service/loading.service"

@Component({
  selector: 'app-auth-request',
  templateUrl: './auth-request.component.html',
  styleUrls: ['./auth-request.component.css']
})
export class AuthRequestComponent {

  constructor(public polymeshService:PolymeshService, private loader:LoadingService){}

  async rejectAuthRequest(req:any){

    try {
      this.loader.showLoading();
      const rejectQueue= await req.remove();
      await rejectQueue.run();
      alert('Request Rejected !!');
      await this.polymeshService.getAuthrorizationRequests()
    } catch (error) {
      alert(error)
    } finally{
      this.loader.hideLoading();
    }
   
  }

  async acceptAuthRequest(req:any){

    try {
      this.loader.showLoading();
      const acceptQueue= await req.accept();
      await acceptQueue.run(); 
      alert('Request Accepted !!');
      await this.polymeshService.getAuthrorizationRequests();
    } catch (error) {
      alert(error)
    } finally{
      this.loader.hideLoading();
    }
   
  }

}
