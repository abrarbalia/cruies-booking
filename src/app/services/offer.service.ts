import { Injectable } from '@angular/core';
import {
  collection,
  getDocs
} from "firebase/firestore";
import { db } from '../firebase';

export interface Offer {
  id?: string;
  title: string;
  description?: string;
  image?: string;
  couponCode?: string;
  discountType?: 'percentage' | 'flat';
  discountValue?: number;
  isActive?: boolean;
  expiryDate?: any;
}

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  // ✅ Get all offers
  async getOffers() {
    const offersRef = collection(db, "offers");
    const snapshot = await getDocs(offersRef);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as any)
    }));
  }

}