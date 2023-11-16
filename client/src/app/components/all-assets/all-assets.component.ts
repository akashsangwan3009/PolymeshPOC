import { Component } from '@angular/core';
import {PolymeshService} from "../../service/polymesh.service"

@Component({
  selector: 'app-all-assets',
  templateUrl: './all-assets.component.html',
  styleUrls: ['./all-assets.component.css']
})
export class AllAssetsComponent {

  constructor(public polymeshService:PolymeshService){}


}
