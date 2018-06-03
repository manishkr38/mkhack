import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http"
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

export interface UserLogin {
  Email: string;
  Password: string;
}

@Injectable()
export class UserService {  

  //readonly rootUrl = "https://localhost:44318";
  readonly rootUrl = "http://edukotapi.azurewebsites.net/";
  constructor(private http: HttpClient) { }


  registerUser(user : User){
      const body: User = {
        //UserName : user.UserName,
        Password : user.Password,
        Email : user.Email,
        FirstName : user.FirstName,
        LastName : user.LastName,
        ConfirmPassword : user.ConfirmPassword,
        PhoneNumber : '9898989898'

      }

      const headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'No-Auth':'True'
    };

    const requestOptions = {                                                                                                                                                                                 
        headers: new HttpHeaders(headerDict),
    };

      return this.http.post(this.rootUrl + '/api/Account/Register', body, requestOptions);

    }

    userAuthentication(userName,password){

      let userLogin: UserLogin = {
        Email : userName,
        Password : password
      };

      var data = "Email="+userName+"&Password="+password;
     
      const headerDict = {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Headers': 'Content-Type',
              'No-Auth':'True'  
          };
    const requestOptions = {                                                                                                                                                                                 
              headers: new HttpHeaders(headerDict),
          };

      var reqHeader = new HttpHeaders({'Content-Type' : 'application/x-www-urlencoded'});
      //return this.http.post(this.rootUrl + '/api/Account/Login', data, {headers : reqHeader});
      //return this.http.post(this.rootUrl + '/api/Account/Login', data, requestOptions );
      return this.http.post(this.rootUrl + '/api/Account/Login', userLogin  , requestOptions );
    }

    // getUserClaims(){
    //   return this.http.get(this.rootUrl + '/api/account/getUserClaims'
    // ,{headers : new HttpHeaders({'Authorization' : 'Bearer ' + localStorage.getItem('userToken')})});                                               
    // }

     getUserClaims(){
       return this.http.get(this.rootUrl + '/api/account/getUserClaims' );                                               
     }
}
