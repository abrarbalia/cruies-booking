import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking-service.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf],
  templateUrl: './my-booking.html',
  styleUrls: ['./my-booking.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyBooking implements OnInit {
  bookings: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(async user => {
      this.loading = true;
      this.errorMessage = '';
      this.bookings = [];
      this.cdr.markForCheck();

      if (user?.email) {
        try {
          this.bookings = await this.bookingService.getUserBookings(user.email);
          console.log('Bookings:', this.bookings);
        } catch (error) {
          console.error('Error fetching bookings:', error);
          this.errorMessage = 'Failed to load bookings.';
        } finally {
          this.loading = false;
          this.cdr.markForCheck();
        }
      } else {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }
}