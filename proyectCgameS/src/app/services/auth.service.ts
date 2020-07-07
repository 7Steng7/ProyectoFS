import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/users'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, provideRoutes } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 user$: Observable<any>;
  constructor(private afAuth: AngularFireAuth,private afs: AngularFirestore ,private router: Router) {   }
 
  async loginGoogle(){
    try{
      const credential = await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
      this.updateUserData(credential.user);
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    catch(error){console.log(error)}
  }
  private updateUserData(user) {
    //Guarda los datos del usuario en firestore al iniciar sesión
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
  
    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName,
      photoURL:user.photoURL
    } 
    return userRef.set(data, { merge: true })
  }
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
