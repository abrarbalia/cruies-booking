import { Component } from '@angular/core';
import { auth } from './firebase';   // adjust ./ or ../ based on actual location
import { FormsModule } from '@angular/forms';
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink
} from "firebase/auth";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email:string="";

  actionCodeSettings = {
    url: 'http://localhost:4200/dashboard',
    handleCodeInApp: true
  };

  // Send login link
  sendOTP(){

    sendSignInLinkToEmail(auth,this.email,this.actionCodeSettings)
    .then(()=>{

      window.localStorage.setItem('emailForSignIn',this.email);

      alert("Login link sent to your email");

    })
    .catch((error)=>{
      console.log(error);
    });

  }

  // Verify login link
  ngOnInit(){

    if(isSignInWithEmailLink(auth,window.location.href)){

      let email = window.localStorage.getItem('emailForSignIn');

      if(!email){
        email = prompt("Please enter your email again") || "";
      }

      signInWithEmailLink(auth,email,window.location.href)
      .then((result)=>{

        window.localStorage.removeItem('emailForSignIn');

        alert("Login Successful");

      })
      .catch((error)=>{
        console.log(error);
      });

    }

  }

}