import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../../../services/booking.service';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.css']
})
export class Bookings implements OnInit {

  bookings: any[] = [];
  filteredBookings: any[] = [];
  selectedStatus: string = 'All';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  async loadBookings() {
    try {
      this.bookings = await this.bookingService.getAllBookings();
      this.filteredBookings = [...this.bookings];
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  }

  filterBookings(status: string) {
    this.selectedStatus = status;

    if (status === 'All') {
      this.filteredBookings = [...this.bookings];
    } else {
      this.filteredBookings = this.bookings.filter(
        booking => booking.status === status
      );
    }
  }

  async updateStatus(id: string, status: string) {
    try {
      await this.bookingService.updateBookingStatus(id, status);
      await this.loadBookings();
      this.filterBookings(this.selectedStatus);
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  }

  async deleteBooking(id: string) {
    try {
      if (!confirm('Delete this booking?')) return;

      await this.bookingService.deleteBooking(id);
      await this.loadBookings();
      this.filterBookings(this.selectedStatus);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  }
}