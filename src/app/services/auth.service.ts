import { Injectable, inject } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  serverTimestamp
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  user$: Observable<User | null> = authState(this.auth);

  async register(fullName: string, email: string, phone: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(this.firestore, 'users', user.uid), {
      uid: user.uid,
      fullName,
      email,
      phone,
      role: 'user',
      createdAt: serverTimestamp()
    });

    return user;
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );

    return userCredential.user;
  }

  async logout() {
    await signOut(this.auth);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  isLoggedIn(): boolean {
    return !!this.auth.currentUser;
  }
}