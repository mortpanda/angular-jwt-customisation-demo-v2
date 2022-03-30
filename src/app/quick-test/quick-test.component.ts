import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-quick-test',
  templateUrl: './quick-test.component.html',
  styleUrls: ['./quick-test.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuickTestComponent implements OnInit {
  widgetParamForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }

  async ngOnInit() {
    this.widgetParamForm = this.fb.group({
      clientId: ["", Validators.required],
      scope: ["", Validators.required]
    });
  }

}
