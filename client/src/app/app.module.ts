import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateTokenComponent } from './components/create-token/create-token.component';
import { LoaderComponent } from './components/loader/loader.component';
import { GetAssetComponent } from './components/get-asset/get-asset.component';
import { AllAssetsComponent } from './components/all-assets/all-assets.component';
import { AuthRequestComponent } from './components/auth-request/auth-request.component';
import { TransferOwnerComponent } from './components/transfer-owner/transfer-owner.component';
import { TransferRequestsComponent } from './components/transfer-requests/transfer-requests.component';
import { AllPortfoliosComponent } from './components/all-portfolios/all-portfolios.component';
import {TokenDetailsComponent} from "./components/token-details/token-details.component";
import { FlowComponentComponent } from './components/flow-component/flow-component.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component'

@NgModule({
  declarations: [
    AppComponent,
    CreateTokenComponent,
    LoaderComponent,
    GetAssetComponent,
    AllAssetsComponent,
    AuthRequestComponent,
    TransferOwnerComponent,
    TransferRequestsComponent,
    AllPortfoliosComponent,
    TokenDetailsComponent,
    FlowComponentComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
