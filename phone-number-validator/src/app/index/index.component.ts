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
  countries: any[] = [];
  payload: {
    accessKey: "eb588dbf70cb81df1c8d374269db9d18",
    number: "",
    country_code: ""
  };
  selectedOption = "";
  diallingCodeInput = this.selection(this.selectedOption);
  validationForm = new FormGroup({
    number: new FormControl('', Validators.pattern('[0-9]+')),
    country_code: new FormControl('', Validators.required),
    codeSelect: new FormControl('', Validators.required),
    validInput: new FormControl('', Validators.required),
  });

  constructor(private numbersService: NumbersService, private router: Router) {
    this.numbersService.getCountryCodes()
      .subscribe(res => {
        const transformed = []
        for (const property in res) {
          transformed.push({ ...res[property], country_code: res[property].country_name + " : " + res[property].dialling_code })
        }
        console.log("modified", transformed)
        this.countries = transformed
      })
  }

  ngOnInit(): void {
  }

  selection(choice: string) {
    var listedChoice = JSON.parse("[" + choice + "]");
    for(let i of listedChoice){
      if(i!="+"){
        listedChoice.splice(1, 1);
      }
    }
    return choice.toString();
  }

  validate() {
    this.numbersService.verifyNumber(this.validationForm.value.number, this.validationForm.value.country_code)
      .subscribe((data) => {
        this.numberDetails = data.body
        //  this.payload.number = this.validationForm.value.number;
        //  this.payload.country_code = this.validationForm.value.country_code;

        this.numbersService.setNumberDetails(this.numberDetails)
        console.log("valid", this.numberDetails)
        if (!this.numberDetails.valid) {
          this.numberDetails.international_format = this.numberDetails.number;
          console.log("error")
          console.log(this.numberDetails.number)
        }
        // console.log("here")
        // console.log("code select", this.validationForm)
        // this.numbersService.verifyNumber(this.validationForm.value.number, "AR")
        //   .subscribe(res => console.log("res", res.body))
      })
  }
}
