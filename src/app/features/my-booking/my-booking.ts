import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking-service.service';

@Component({
  selector: 'app-my-booking',
  imports: [CommonModule],
  templateUrl: './my-booking.html',
  styleUrls: ['./my-booking.css']
})
export class MyBooking implements OnInit {
  bookings: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(async user => {
      if (user?.email) {
        this.loading = true;
        this.errorMessage = '';

        try {
          this.bookings = await this.bookingService.getUserBookings(user.email);
          console.log('Bookings:', this.bookings);
        } catch (error) {
          console.error('Error fetching bookings:', error);
          this.errorMessage = 'Failed to load bookings.';
        } finally {
          this.loading = false;
        }
      } else {
        this.bookings = [];
        this.loading = false;
      }
    });
  }
}