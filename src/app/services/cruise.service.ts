import { Injectable } from '@angular/core';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where
} from "firebase/firestore";
import { db } from '../firebase';

@Injectable({
  providedIn: 'root'
})
export class CruiseService {

  // ✅ Get all cruises
  async getCruises() {
    const cruiseCol = collection(db, "cruises");
    const snapshot = await getDocs(cruiseCol);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as any)
    }));
  }

  // ✅ Get search dropdown filters
  async getSearchFilters() {
    const filtersRef = doc(db, "searchOptions", "cruiseFilters");
    const snapshot = await getDoc(filtersRef);

    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      return null;
    }
  }

  // ✅ Search cruises with filters
  async searchCruises(filters: any) {

    let cruiseRef: any = collection(db, "cruises");
    const conditions: any[] = [];

    if (filters.destination)
      conditions.push(where("destination", "==", filters.destination));

    if (filters.port)
      conditions.push(where("port", "==", filters.port));

    if (filters.month)
      conditions.push(where("month", "==", filters.month));

    if (filters.nights)
      conditions.push(where("nights", "==", Number(filters.nights)));

    if (conditions.length > 0)
      cruiseRef = query(cruiseRef, ...conditions);

    const snapshot = await getDocs(cruiseRef);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as any)
    }));
  }

  async getCruiseById(id: string) {
  const cruises = await this.getCruises();
  return cruises.find(c => c.id === id);
}

}