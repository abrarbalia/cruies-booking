import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckinService } from '../../../services/checkin.service';
@Component({
  selector: 'app-checkin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkin.html',
  styleUrls: ['./checkin.css']
})
export class Checkin implements OnInit {
  private checkinService = inject(CheckinService);

  bookings: any[] = [];
  filteredBookings: any[] = [];
  selectedPassenger: any = null;
  searchText = '';

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.checkinService.getBookings().subscribe({
      next: (data: any[]) => {
        console.log('All bookings:', data);

        this.bookings = data.filter((booking: any) => booking.status === 'Confirmed');
        this.filteredBookings = [...this.bookings];

        if (this.selectedPassenger) {
          const updated = this.bookings.find(
            b => b.docId === this.selectedPassenger.docId
          );
          if (updated) {
            this.selectedPassenger = updated;
          }
        }
      },
      error: (err) => {
        console.error('Error loading bookings:', err);
      }
    });
  }

  filterPassengers() {
    const value = this.searchText.toLowerCase().trim();

    if (!value) {
      this.filteredBookings = [...this.bookings];
      return;
    }

    this.filteredBookings = this.bookings.filter((booking: any) => {
      const passenger = booking.passengers?.[0];

      const firstName = passenger?.firstName?.toLowerCase() || '';
      const lastName = passenger?.lastName?.toLowerCase() || '';
      const fullName = `${firstName} ${lastName}`;
      const phone = passenger?.phone?.toLowerCase() || '';
      const passport = passenger?.passport?.toLowerCase() || '';
      const email = passenger?.email?.toLowerCase() || '';
      const reference = booking.reference?.toLowerCase() || '';
      const title = booking.title?.toLowerCase() || '';
      const cabinType = booking.cabin?.type?.toLowerCase() || '';

      return (
        fullName.includes(value) ||
        firstName.includes(value) ||
        lastName.includes(value) ||
        phone.includes(value) ||
        passport.includes(value) ||
        email.includes(value) ||
        reference.includes(value) ||
        title.includes(value) ||
        cabinType.includes(value)
      );
    });
  }

  selectPassenger(booking: any) {
    this.selectedPassenger = booking;
  }

  async verifyPassenger(bookingId: string) {
    try {
      await this.checkinService.verifyPassenger(bookingId);
      alert('Passenger verified successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to verify passenger');
    }
  }

  async checkInPassenger(bookingId: string) {
    try {
      await this.checkinService.checkInPassenger(bookingId);
      alert('Passenger checked in successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to check in passenger');
    }
  }

  async markHold(bookingId: string) {
    try {
      await this.checkinService.markHold(bookingId);
      alert('Passenger marked as Hold');
    } catch (error) {
      console.error(error);
      alert('Failed to mark hold');
    }
  }

  async markNotArrived(bookingId: string) {
    try {
      await this.checkinService.markNotArrived(bookingId);
      alert('Passenger marked as Not Arrived');
    } catch (error) {
      console.error(error);
      alert('Failed to update passenger');
    }
  }

  getTotalPassengers(): number {
    return this.filteredBookings.length;
  }

  getCheckedInCount(): number {
    return this.filteredBookings.filter(
      b => b.boardingStatus === 'Checked In'
    ).length;
  }

  getPendingCount(): number {
    return this.filteredBookings.filter(
      b => !b.boardingStatus || b.boardingStatus === 'Pending'
    ).length;
  }

  getHoldCount(): number {
    return this.filteredBookings.filter(
      b => b.boardingStatus === 'Hold'
    ).length;
  }
}