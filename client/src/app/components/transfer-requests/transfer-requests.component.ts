import { Component } from '@angular/core';
import {PolymeshService} from "../../service/polymesh.service"
import {LoadingService} from "../../service/loading.service"

@Component({
  selector: 'app-transfer-requests',
  templateUrl: './transfer-requests.component.html',
  styleUrls: ['./transfer-requests.component.css']
})
export class TransferRequestsComponent {

  constructor(public polymeshService:PolymeshService, private loader:LoadingService){}

  async affirmPendingRequest(req:any){
    try {
      console.log(req);
      this.loader.showLoading();
      const affirmQueue=await req.affirm();
      await affirmQueue.run();
      this.polymeshService.getAllTransferRequest();
      this.loader.hideLoading();
    } catch (error) {
      alert(error)
    }
  }

  async rejectPendingRequest(req:any){
    try {
      this.loader.showLoading();
      const rejectQueue=await req.reject();
      await rejectQueue.run();
      this.polymeshService.getAllTransferRequest();
      this.loader.hideLoading();
    } catch (error) {
      alert(error)
    }
  }
}
