import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../../../services/booking.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './passengers.html',
  styleUrls: ['./passengers.css']
})
export class Passengers implements OnInit {

  cruise: any;
  cabin: any;
  passengerCount = 1;

  basePrice = 0;
  tax = 0;
  portFee = 2000;
  total = 0;

  passengers: any[] = [];
  emergencyContact: any = {
    name: '',
    phone: '',
    relationship: ''
  };

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit() {

  const booking = this.bookingService.getBooking();

  if (!booking.cruise || !booking.cabin) {
    this.router.navigate(['/']);
    return;
  }

  this.cruise = booking.cruise;
  this.cabin = booking.cabin;

  const count = booking.passengers?.length || 1;

  this.passengerCount = count;

  this.basePrice =
    this.cruise.price *
    this.cabin.priceMultiplier *
    count;

  this.tax = this.basePrice * 0.10;
  this.total = booking.totalAmount;

  this.generatePassengers(count);
}

generatePassengers(count: number) {

  this.passengers = [];

  for (let i = 0; i < count; i++) {
    this.passengers.push({
      firstName: '',
      lastName: '',
      dob: '',
      nationality: '',
      passport: '',
      email: '',
      phone: ''
    });
  }
}

  continue() {

    const invalidPassenger = this.passengers.some(p =>
      !p.firstName?.trim() ||
      !p.lastName?.trim() ||
      !p.dob ||
      !p.passport?.trim()
    );

    if (invalidPassenger) {
      console.log(this.passengers);
      alert('Please fill all required passenger details');
      return;
    }

    this.bookingService.setPassengers(this.passengers);
    this.bookingService.setEmergency(this.emergencyContact);
    
    this.router.navigate([
      '/booking',
      this.cruise.id,
      'confirm'
    ]);
  }

  goBack() {
    this.router.navigate([
      '/booking',
      this.cruise.id
    ]);
  }
  

}