import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  currentUser: User | null = null;

  showRegister = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  openRegister() {
    this.showRegister = true;
  }

  closeRegister() {
    this.showRegister = false;
  }

  async logout() {
    try {
      await this.authService.logout();
      alert('Logged out successfully');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}