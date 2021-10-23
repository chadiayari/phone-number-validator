import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NumbersService, NumberDetails } from '../numbers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  numberDetails: NumberDetails;
  countries: any[] = ["hello world", "okey", "good"];

  validationForm = new FormGroup({
    number: new FormControl('', Validators.pattern('[0-9]+')),
    country_code: new FormControl('', Validators.required),
    codeSelect: new FormControl('', Validators.required),
    validInput: new FormControl('', Validators.required),
  });

  constructor(private ns: NumbersService, private router: Router) {
    this.ns.getCountryCodes()
      .subscribe(res => {
        const transformed = []
        for (const property in res) {
          transformed.push({ ...res[property], country_code: property + " : " + res[property].country_name })
        }
        console.log("modified", transformed)
        this.countries = transformed
      })
  }

  ngOnInit(): void {
  }

  validate() {
    console.log("here")
    console.log("code select", this.validationForm)
    this.ns.verifyNumber(this.validationForm.value.number, "AR")
      .subscribe(res => console.log("res", res.body))
  }
}
