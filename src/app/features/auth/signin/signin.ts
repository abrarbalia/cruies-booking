import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './signin.html',
  styleUrls: ['./signin.css']
})
export class Signin {
  fullName = signal('');
  email = signal('');
  phone = signal('');
  password = signal('');
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async signUp() {
    if (
      !this.fullName().trim() ||
      !this.email().trim() ||
      !this.phone().trim() ||
      !this.password().trim()
    ) {
      alert('Please fill all fields');
      return;
    }

    if (this.password().length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    try {
      this.loading.set(true);

      await this.authService.register(
        this.fullName(),
        this.email(),
        this.phone(),
        this.password()
      );

      alert('Account created successfully');
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Signup error:', error);
      alert(error?.message || 'Registration failed');
    } finally {
      this.loading.set(false);
    }
  }
}