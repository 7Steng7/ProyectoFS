import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../../interfaces/users';
import { Observable, of } from 'rxjs';
import { JuegosService } from 'src/app/services/juegos.service';
import { Compartir } from '../../interfaces/compartir';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cambios',
  templateUrl: './cambios.component.html',
  styleUrls: ['./cambios.component.scss']
})
export class CambiosComponent implements OnInit {

  constructor(private services: JuegosService,
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private authS:AuthService ) { }

  nombre: string = '';
  precio: string = '';
  urlimg: string = '';
  uploadFiles: any[] = [];
  user$: Observable<any>;
  compartirs : Compartir[];

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
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);
    const data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName,
      photoURL:user.photoURL,
    } 
    return userRef.set(data, { merge: true })
  }

  enviarjuego(user){
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`compartir/${user.uid}`+`${this.nombre}`);
    const datos = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName,
      photoURL:user.photoURL,
      juego_cambio : this.nombre,
      precioreal: this.precio,
      urlimg: this.urlimg
    } 
    return userRef.set(datos, { merge: true })
  }

  logout() {
    this.auth.signOut();
  }

  getcompartir(): void{
    this.services.getcompartir()
    .subscribe((compartirs) => { this.compartirs = compartirs });
  }
    ngOnInit(): void {
      this.getcompartir();
    }

}
