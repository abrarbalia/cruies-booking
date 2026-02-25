import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-booking.html',
  styleUrls: ['./my-booking.css']
})
export class MyBooking {
  bookingId = signal('');
  bookingFound = signal(false);

  searchBooking() {
    if (!this.bookingId()) {
      alert('Please enter Booking ID');
      return;
    }

    this.bookingFound.set(true);
  }
}