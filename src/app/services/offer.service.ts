import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Offer {
  id?: string;
  title?: string;
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

  async getOffers() {
    const offersRef = collection(db, 'offers');
    const snapshot = await getDocs(offersRef);

    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...(docSnap.data() as any)
    }));
  }

  async addOffer(offerData: any) {
    const offersRef = collection(db, 'offers');
    await addDoc(offersRef, offerData);
  }

  async updateOffer(id: string, offerData: any) {
    const offerRef = doc(db, 'offers', id);
    await updateDoc(offerRef, offerData);
  }

  async deleteOffer(id: string) {
    const offerRef = doc(db, 'offers', id);
    await deleteDoc(offerRef);
  }

  async toggleOfferStatus(id: string, currentStatus: boolean) {
    const offerRef = doc(db, 'offers', id);
    await updateDoc(offerRef, {
      isActive: !currentStatus
    });
  }
}