import { Injectable, inject } from '@angular/core';
import { Auth, sendSignInLinkToEmail } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = inject(Auth);

  async register(email: string) {

    const actionCodeSettings = {
      url: 'http://localhost:4200/finishSignUp',
      handleCodeInApp: true
    };

    await sendSignInLinkToEmail(this.auth, email, actionCodeSettings);

    localStorage.setItem('emailForSignIn', email);
  }
}