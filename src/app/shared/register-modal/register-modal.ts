import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-modal.html',
  styleUrls: ['./register-modal.css']
})
export class RegisterModal {

  @Output() close = new EventEmitter<void>();

  email: string = '';

  register() {
    console.log(this.email);
    this.close.emit();   // close after register
  }

  closeModal() {
    this.close.emit();
  }
}