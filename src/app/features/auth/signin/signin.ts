import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-signin', // folder/class stays signin
  standalone: true,
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class Signin {

  firstName = signal('');
  lastName = signal('');
  email = signal('');
  password = signal('');

  signUp() {
    if (!this.firstName() || !this.lastName() || !this.email() || !this.password()) {
      alert('Please fill all fields');
      return;
    }

    console.log('Sign-Up Data:', {
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: this.email(),
      password: this.password()
    });

    alert('Registration successful!');
    // Later → navigate to login or dashboard
  }
}