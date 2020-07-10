import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../interfaces/users';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-cambios',
  templateUrl: './cambios.component.html',
  styleUrls: ['./cambios.component.scss']
})
export class CambiosComponent implements OnInit {

  constructor(public auth: AngularFireAuth,private afs: AngularFirestore) { }

  user$: Observable<any>;
  cargados : any[] = [];
  async login() {
    //Se simplifica con
    //this.authS.loginGoogle();
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
      photoURL:user.photoURL,
    } 
    return userRef.set(data, { merge: true })
  }
  logout() {
    this.auth.signOut();
  }
  ngOnInit(): void {
  }

}
