import { Injectable } from '@angular/core';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
 
  
  private booking: any = {
    cruise: null,
    cabin: null,
    passengers: [],
    emergencyContact: null,

    originalAmount: 0,
    discount: 0,
    totalAmount: 0,

    offer: null
  };

  // ==============================
  // Local booking step data
  // ==============================

  setCruise(cruise: any) {
    this.booking.cruise = cruise;
  }

  setCabin(cabin: any) {
    this.booking.cabin = cabin;
  }

  setPassengers(passengers: any[]) {
    this.booking.passengers = passengers;
  }

  setEmergency(contact: any) {
    this.booking.emergencyContact = contact;
  }

  setOriginalAmount(amount: number) {
    this.booking.originalAmount = amount;
  }

  setDiscount(amount: number) {
    this.booking.discount = amount;
  }

  setTotal(amount: number) {
    this.booking.totalAmount = amount;
  }

  setOffer(offer: any | null) {
    this.booking.offer = offer;
  }

  getBooking() {
    return this.booking;
  }

  clear() {
    this.booking = {
      cruise: null,
      cabin: null,
      passengers: [],
      emergencyContact: null,
      originalAmount: 0,
      discount: 0,
      totalAmount: 0,
      offer: null
    };
  }

  // ==============================
  // Firestore booking methods
  // ==============================

  async saveBooking(reference: string) {
    const bookingData = {
      ...this.booking,
      reference: reference,
      status: 'Pending',
      originalAmount: Number(this.booking.originalAmount || 0),
      discount: Number(this.booking.discount || 0),
      totalAmount: Number((this.booking.totalAmount || 0).toFixed(2)),
      createdAt: serverTimestamp()
    };

    const bookingRef = await addDoc(collection(db, 'bookings'), bookingData);
    return bookingRef.id;
  }

  async getAllBookings() {
    const bookingCol = collection(db, 'bookings');
    const snapshot = await getDocs(bookingCol);

    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...(docSnap.data() as any)
    }));
  }

  async updateBookingStatus(id: string, status: string) {
    const bookingRef = doc(db, 'bookings', id);
    await updateDoc(bookingRef, { status });
  }

  async deleteBooking(id: string) {
    const bookingRef = doc(db, 'bookings', id);
    await deleteDoc(bookingRef);
  }
  
}