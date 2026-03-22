import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, query, where, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private firestore = inject(Firestore);

  getUserBookings(userId: string): Observable<any[]> {
    const bookingsRef = collection(this.firestore, 'bookings');
    const q = query(
      bookingsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }
}