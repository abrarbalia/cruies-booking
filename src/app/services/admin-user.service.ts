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

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  async getUsers() {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);

    return snapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...(docSnap.data() as any)
    }));
  }

  async addUser(userData: any) {
    const usersRef = collection(db, 'users');
    await addDoc(usersRef, userData);
  }

  async updateUser(id: string, userData: any) {
    const userRef = doc(db, 'users', id);
    await updateDoc(userRef, userData);
  }

  async deleteUser(id: string) {
    const userRef = doc(db, 'users', id);
    await deleteDoc(userRef);
  }
}