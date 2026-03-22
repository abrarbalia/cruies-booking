import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = signal('');
  password = signal('');
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    if (!this.email().trim() || !this.password().trim()) {
      alert('Please enter email and password');
      return;
    }

    try {
      this.loading.set(true);

      await this.authService.login(this.email(), this.password());

      alert('Login successful');
      this.router.navigate(['/']);
    } catch (error: any) {
      console.error(error);
      alert(error?.message || 'Login failed');
    } finally {
      this.loading.set(false);
    }
  }
}