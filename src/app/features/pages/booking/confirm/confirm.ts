import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // ✅ ADD THIS
import { Router } from '@angular/router';
import { BookingService } from '../../../../services/booking.service';

import { db } from '../../../../firebase';
import { collection, addDoc } from 'firebase/firestore';

@Component({
  standalone: true,
  imports: [CommonModule],   // ✅ ADD THIS
  templateUrl: './confirm.html',
  styleUrls: ['./confirm.css']
})
export class Confirm implements OnInit {

  booking: any;
  loading = false;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.booking = this.bookingService.getBooking();

    if (!this.booking?.cruise || !this.booking?.passengers?.length) {
      this.router.navigate(['/']);
    }
  }

  generateReference(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'CRU-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async confirmBooking() {

    this.loading = true;

    const bookingReference = this.generateReference();

    const bookingData = {
        reference: bookingReference,
        status: 'Confirmed',
        cruise: this.booking.cruise,
        cabin: this.booking.cabin,
        passengers: this.booking.passengers,
        emergencyContact: this.booking.emergencyContact,
        totalAmount: this.booking.totalAmount,
        createdAt: new Date()
    };

    try {

      const docRef = await addDoc(
        collection(db, 'bookings'),
        bookingData
      );

      this.bookingService.clear();

      this.router.navigate(['/ticket', docRef.id]);

    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Something went wrong.');
    }

    this.loading = false;
  }

  goBack() {
    this.router.navigate([
      '/booking',
      this.booking.cruise.id,
      'passengers'
    ]);
  }

}