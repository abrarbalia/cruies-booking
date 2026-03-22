import { Injectable } from '@angular/core';
import { db } from '../firebase';// Make sure your firebase.ts exports Firestore db
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  private bookingsSubject = new BehaviorSubject<any[]>([]);
  bookings$ = this.bookingsSubject.asObservable();

  constructor() {}

  // Load bookings from Firestore
  async loadBookings() {
    try {
      const bookingsRef = collection(db, 'bookings');
      const snapshot = await getDocs(bookingsRef);

      const bookings = snapshot.docs.map(docSnap => ({
        docId: docSnap.id,
        ...docSnap.data()
      }));

      this.bookingsSubject.next(bookings);
    } catch (err) {
      console.error('Error loading bookings:', err);
    }
  }

  // Observable for component
  getBookings() {
    return this.bookings$;
  }

  // Actions
  async verifyPassenger(bookingId: string) {
    await this.updateStatus(bookingId, 'Verified');
  }

  async checkInPassenger(bookingId: string) {
    await this.updateStatus(bookingId, 'Checked In');
  }

  async markHold(bookingId: string) {
    await this.updateStatus(bookingId, 'Hold');
  }

  async markNotArrived(bookingId: string) {
    await this.updateStatus(bookingId, 'Not Arrived');
  }

  private async updateStatus(bookingId: string, status: string) {
    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, { boardingStatus: status });

      // Reload bookings after update
      await this.loadBookings();
    } catch (err) {
      console.error('Error updating booking status:', err);
      throw err;
    }
  }
}