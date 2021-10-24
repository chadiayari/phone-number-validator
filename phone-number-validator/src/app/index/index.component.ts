import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NumbersService, NumberDetails } from '../numbers.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  numberDetails: NumberDetails;
  countries: any[] = [];
  selectedOption = "";
  validationForm = new FormGroup({
    number: new FormControl('', Validators.pattern('[0-9]+')),
    country_code: new FormControl('', Validators.required),
    dialling_code: new FormControl('', Validators.required),
    codeSelect: new FormControl('', Validators.required),
  });
  diallingCodeInput = this.selection(this.selectedOption);
  phoneCountryPrefix: any;

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

  //used for adding country's dial code in input field
  selection(option: string) {
    this.phoneCountryPrefix = option.substring(option.indexOf("+") + 1, option.length);
  }

  //checks if the user input is correct or incorrect
  validate() {
    this.numbersService.verifyNumber(this.validationForm.value.number, this.validationForm.value.country_code, this.validationForm.value.dialling_code)
      .subscribe((data) => {
        this.numberDetails = data.body
        this.numbersService.setNumberDetails(this.numberDetails)
        if (this.numberDetails.valid) {
          swal.fire(
            'Success',
            data.body.number + ' is a correct phone number, its origin is from: ' + data.body.carrier,
            'success'
          );
        }
        if (!this.numberDetails.valid) {
          this.numberDetails.international_format = this.numberDetails.number;
          if(data.body.error){
            if (data.body.error.type == "no_phone_number_provided")
            swal.fire(
              'Error',
              data.body.error.info,
              'error'
            );
          }
          else {
            swal.fire(
              'Error',
              'Your input is incorrect',
              'error'
            );
          }
        }
      })
  }
}
