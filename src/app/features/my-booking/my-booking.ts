import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { BookingService } from '../../services/booking-service.service';

@Component({
  selector: 'app-my-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-booking.html',
  styleUrls: ['./my-booking.css']
})
export class MyBooking implements OnInit {
  bookings: any[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.bookingService.getUserBookings(user.uid).subscribe(data => {
          this.bookings = data;
          this.loading = false;
        });
      } else {
        this.bookings = [];
        this.loading = false;
      }
    });
  }
}