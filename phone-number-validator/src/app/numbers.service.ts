import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  validationResult = {
    number: "",
    valid: ""
  };
  format=1;
  numberDetails: NumberDetails;

  constructor(private http: HttpClient) { }
  public verifyNumber(num: any, code: any) {

    this.number = num;
    this.country_code = code;
    return this.http.get<any>(this.apiUrl + "/validate?access_key=" + this.accessKey + "&number=" + this.number + "&country_code" + this.country_code + this.format,
      { observe: 'response' });
  }

  public setNumberDetails(numberD: NumberDetails) {
    this.numberDetails = numberD;
  }

  public getCountryCodes() {
    console.log("sending request", this.apiUrl + "/countries" + "?access_key=" + this.accessKey)
    return this.http.get<any>(this.apiUrl + "/countries" + "?access_key=" + this.accessKey);
  }
}
