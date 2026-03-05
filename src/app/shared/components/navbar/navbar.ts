import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModal } from '../../register-modal/register-modal';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RegisterModal, CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']   // ✅ FIXED (was styleUrl)
})
export class Navbar {

  showRegister = false;

  openRegister() {
    this.showRegister = true;
  }

  closeRegister() {
    this.showRegister = false;
  }
}