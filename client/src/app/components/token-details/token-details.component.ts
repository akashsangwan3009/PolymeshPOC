import { Component } from '@angular/core';
import {PolymeshService} from "../../service/polymesh.service"

@Component({
  selector: 'app-token-details',
  templateUrl: './token-details.component.html',
  styleUrls: ['./token-details.component.css']
})
export class TokenDetailsComponent {

  constructor(public polymeshService:PolymeshService){}

}
