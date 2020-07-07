import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from '../../interfaces/users'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss']
})
export class ArtistasComponent {
  user$: Observable<any>;
  constructor(private authS:AuthService, private router: Router,public auth: AngularFireAuth, private afs: AngularFirestore) { }

  async login() {
    const credential = await this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    return this.updateUserData(credential.user);
  }
  async loginfacebook(){
    const credential = await this.auth.signInWithPopup(new auth.FacebookAuthProvider());
    return this.updateUserData(credential.user);
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
  logout() {
    this.auth.signOut();
  }

}
