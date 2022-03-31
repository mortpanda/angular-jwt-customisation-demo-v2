import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OktaWidgetService } from 'app/shared/okta/okta-widget.service';
import { OktaConfigService } from "app/shared/okta/okta-config.service";

@Component({
  selector: 'app-quick-test',
  templateUrl: './quick-test.component.html',
  styleUrls: ['./quick-test.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuickTestComponent implements OnInit {
  widgetParamForm: FormGroup;
  quicktest_tokens: boolean = false;
  quickTestflag;
  quickTestTokens;
  // defaultScope=["openid, email, profile, address, groups"]

  constructor(
    private fb: FormBuilder,
    public OktaWidgetService: OktaWidgetService,
    private OktaConfig: OktaConfigService,
  ) { }

  strQuickTestTokens;
  strReloadFlag;
  async ngOnInit() {
    this.widgetParamForm = this.fb.group({
      scope: ["openid, email, profile, address, groups", Validators.required]
    });
    this.quickTestTokens = JSON.parse(localStorage.getItem('okta_jwt_quicktest_2'));
    console.log(this.quickTestTokens)



    switch (this.quickTestTokens) {
      case null: {
        this.quickTestflag = false;
        document.getElementById("applySetting").style.visibility = "visible";
        document.getElementById("resetSetting").style.visibility = "hidden";
        await this.OktaWidgetService.quickTestClose(this.OktaConfig.strScope);
        await this.OktaWidgetService.quickTestLogin(this.OktaConfig.strScope, this.OktaConfig.testSIWRedirect);
        // await this.OktaWidgetService.quickTestLogin( this.arrScopes, this.OktaConfig.testSIWRedirect);
        break;
      }
      // case "reload":{
      //    await this.OktaWidgetService.quickTestLogin( this.arrScopes, this.OktaConfig.testSIWRedirect);
      //   break;
      // }
      default: {
        this.quickTestflag = true;
        document.getElementById("applySetting").style.visibility = "hidden";
        document.getElementById("resetSetting").style.visibility = "visible";
        this.strQuickTestTokens = this.quickTestTokens;
        break;
      }
    }

  }

  scopeToArray(scope) {
    scope = scope.split(',')
    for (var i = 0; i < scope.length; i++) {
      var strScope
      strScope = scope[i].replace(/\s/g, "");
      this.arrScopes[i] = strScope;
    }
    console.log(this.arrScopes)
  }

  strScope;
  arrScopes = [];
  async ScopeUpdated(event) {

    // console.log("New scope is : ", event.target.value);
    // this.strScope = event.target.value;
    this.scopeToArray(event.target.value);
    // console.log(this.arrScopes);


  }

  // strNewClientId;
  // ClientIdUpdated(event) {
  //   console.log("New Client ID is : ", event.target.value);
  //   this.strNewClientId = event.target.value;
  // }

  async onSubmit() {
    this.quickTestflag = false;

    console.log('Submit clicked')

    await localStorage.removeItem('okta_jwt_quicktest_2')
    await this.OktaWidgetService.quickTestClose(this.OktaConfig.strScope);
    await this.OktaWidgetService.quickTestLogin(this.arrScopes, this.OktaConfig.testSIWRedirect);
    //applySetting


  }

  async Reset() {
    this.widgetParamForm = this.fb.group({
      scope: ["openid, email, profile, address, groups", Validators.required]
    });
    await localStorage.removeItem('okta_jwt_quicktest_2');
    window.location.reload();

  }

}

