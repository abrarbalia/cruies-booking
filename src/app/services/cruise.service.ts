import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  addDoc
} from 'firebase/firestore';
import { db } from '../firebase';

@Injectable({
  providedIn: 'root'
})
export class CruiseService {

  // Admin: get all cruises
  async getCruises() {
    const cruiseCol = collection(db, 'cruises');
    const snapshot = await getDocs(cruiseCol);

    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...(docSnap.data() as any)
    }));
  }

  // User: get only active cruises
  async getActiveCruises() {
    const cruiseCol = collection(db, 'cruises');
    const q = query(cruiseCol, where('isActive', '==', true));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...(docSnap.data() as any)
    }));
  }

  // Search filters
  async getSearchFilters() {
    const filtersRef = doc(db, 'searchOptions', 'cruiseFilters');
    const snapshot = await getDoc(filtersRef);

    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      return null;
    }
  }

  // User search: only active cruises
  async searchCruises(filters: any) {
    let cruiseRef: any = collection(db, 'cruises');
    const conditions: any[] = [where('isActive', '==', true)];

    if (filters.destination) {
      conditions.push(where('destination', '==', filters.destination));
    }

    if (filters.port) {
      conditions.push(where('port', '==', filters.port));
    }

    if (filters.month) {
      conditions.push(where('month', '==', filters.month));
    }

    if (filters.nights) {
      conditions.push(where('nights', '==', Number(filters.nights)));
    }

    cruiseRef = query(cruiseRef, ...conditions);

    const snapshot = await getDocs(cruiseRef);

    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...(docSnap.data() as any)
    }));
  }

  async getCruiseById(id: string) {
    const ref = doc(db, 'cruises', id);
    const snapshot = await getDoc(ref);

    if (snapshot.exists()) {
      return {
        id: snapshot.id,
        ...(snapshot.data() as any)
      };
    }

    return null;
  }

  async addCruise(cruiseData: any) {
    await addDoc(collection(db, 'cruises'), cruiseData);
  }

  async updateCruise(id: string, cruiseData: any) {
    const ref = doc(db, 'cruises', id);
    await updateDoc(ref, cruiseData);
  }

  async deleteCruise(id: string) {
    const ref = doc(db, 'cruises', id);
    await deleteDoc(ref);
  }

  async toggleCruiseStatus(id: string, currentStatus: boolean) {
    const ref = doc(db, 'cruises', id);

    await updateDoc(ref, {
      isActive: !currentStatus
    });
  }
}