import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewEncapsulation } from '@angular/core';

import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import{OktaConfigService} from 'app/shared/okta/okta-config.service';
import { OktaSDKAuthService } from '../shared/okta/okta-auth.service';
import { OktaAuth} from '@okta/okta-auth-js'

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StartComponent implements OnInit {
  private authService = new OktaAuth(this.OktaSDKAuthService.config);
  public thisUser;
  public thisToken;

  public thisAccessToken;
  public thisIDToken;
  public jsonAccessToken;


  
  defaultScope;
  constructor(
    public OktaConfigService:OktaConfigService,
    private OktaSDKAuthService: OktaSDKAuthService
  ) { }

  async ngOnInit() {


    console.log(this.defaultScope)

    this.thisUser = await JSON.parse(localStorage.getItem('okta_jwt_custom_2'));
    this.thisToken = await JSON.parse(localStorage.getItem('okta_jwt_custom_2'));

    this.thisAccessToken = await this.thisToken.accessToken;
    this.thisIDToken =  await this.thisToken.idToken;
    this.jsonAccessToken = await this.thisAccessToken.map(function (obj) {
      // return obj.id;
    });
  }


  

}


//idToken.claims.email
