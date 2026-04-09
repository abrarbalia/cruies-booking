import { Injectable } from '@angular/core';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  async getUserBookings(userEmail: string): Promise<any[]> {
    const bookingsRef = collection(db, 'bookings');
    const querySnapshot = await getDocs(bookingsRef);

    const bookings = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as any[];

    return bookings.filter(booking =>
      booking.passengers?.some((p: any) => p.email === userEmail)
    );
  }
}