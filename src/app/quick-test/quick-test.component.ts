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
  
  quicktest_tokens:boolean;
  // quicktest_tokens=false;
  
  constructor(
    private fb: FormBuilder,
    public OktaWidgetService: OktaWidgetService,
    private OktaConfig: OktaConfigService,
  ) { }

  async ngOnInit() {
    this.quicktest_tokens = true;
    console.log(this.quicktest_tokens)
    this.strNewClientId = this.OktaConfig.strClientID;
    this.widgetParamForm = this.fb.group({
      clientId: ["0oa3cto3fn6n2yrNr1d7", Validators.required],
      //scope: ["", Validators.required]
      scope: ["openid, email, profile, address, groups", Validators.required]
    });
    // await this.OktaWidgetService.quickTestLogin(this.OktaConfig.strClientID, this.OktaConfig.strScope, this.OktaConfig.testSIWRedirect);
    // console.log(this.widgetParamForm.get("scope").value)
  }

  strScope;
  arrScopes = [];
  async ScopeUpdated(event) {
    // console.log("New scope is : ", event.target.value);
    this.strScope = event.target.value;
    this.strScope = this.strScope.split(',')
    for (var i = 0; i < this.strScope.length; i++) {
      var strScope
      strScope = this.strScope[i].replace(/\s/g, "");
      this.arrScopes[i] = strScope;
    }
    console.log(this.arrScopes);

  }

  strNewClientId;
  ClientIdUpdated(event) {
    console.log("New Client ID is : ", event.target.value);
    this.strNewClientId = event.target.value;
  }

  async onSubmit() {
    console.log('Submit clicked')
    console.log(this.strScope);
    this.OktaWidgetService.quickTestClose(this.OktaConfig.strClientID, this.OktaConfig.strScope);
    this.OktaWidgetService.quickTestLogin(this.strNewClientId, this.strScope, this.OktaConfig.testSIWRedirect);
  }

}
