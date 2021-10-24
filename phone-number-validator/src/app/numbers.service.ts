import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface NumberDetails {
  valid: boolean,
  number: string,
  local_format: string,
  international_format: string,
  country_prefix: string,
  country_code: string,
  location: string,
  carrier: string,
  line_type: string
}

export interface ValidationResult {
  valid: boolean,
  number: string
}

@Injectable({
  providedIn: 'root'
})
export class NumbersService {
  apiUrl = "http://apilayer.net/api";
  serverUrl = "http://localhost:4200";
  accessKey = "eb588dbf70cb81df1c8d374269db9d18";
  number = "";
  country_code = "";
  dialling_code = "";
  format = 1;
  numberDetails: NumberDetails;
  validationResult = {
    number: "",
    valid: ""
  };

  constructor(private http: HttpClient) { }

  //verifies phone number from API
  public verifyNumber(num: any, code: any, diallingCode: any) {
    this.number = num;
    this.country_code = code;
    this.dialling_code = diallingCode;
    return this.http.get<any>(this.apiUrl + "/validate?access_key=" + this.accessKey + "&number=" + this.number + this.dialling_code + "&country_code" + this.country_code + this.format,
      { observe: 'response' });
  }

  //Set correct number format
  public setNumberDetails(numberD: NumberDetails) {
    this.numberDetails = numberD;
  }

  //fetches country codes from API
  public getCountryCodes() {
    return this.http.get<any>(this.apiUrl + "/countries" + "?access_key=" + this.accessKey);
  }
}
