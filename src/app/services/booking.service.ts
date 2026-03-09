import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingData: any = {
    cruise: null,
    cabin: null,
    passengers: [],
    emergencyContact: null,
    totalAmount: 0
  };

  setCruise(cruise: any) {
    this.bookingData.cruise = cruise;
  }

  setCabin(cabin: any) {
    this.bookingData.cabin = cabin;
  }

  setPassengers(passengers: any[]) {
    this.bookingData.passengers = passengers;
  }

  setEmergency(contact: any) {
    this.bookingData.emergencyContact = contact;
  }

  setTotal(amount: number) {
    this.bookingData.totalAmount = amount;
  }

  getBooking(): any {
    return this.bookingData;
  }

  clear() {
    this.bookingData = {
      cruise: null,
      cabin: null,
      passengers: [],
      emergencyContact: null,
      totalAmount: 0
    };
  }
}