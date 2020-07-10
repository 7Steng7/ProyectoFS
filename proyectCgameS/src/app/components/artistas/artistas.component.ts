import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from '../../interfaces/users';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage} from '@angular/fire/storage'
import { JuegosService } from '../../services/juegos.service';
import { Subido } from '../../interfaces/subido';

@Component({
  selector: 'app-artistas',
  templateUrl: './artistas.component.html',
  styleUrls: ['./artistas.component.scss']
})
export class ArtistasComponent {
  subidos : Subido[];
  value: string = '';
  percent: number;
  user$: Observable<any>;
  url: string;
  cargados : any[] = [];
  constructor(private authS:AuthService, private router: Router,public auth: AngularFireAuth, private afs: AngularFirestore, private storage: AngularFireStorage, private juegoService: JuegosService ) { }

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
  uploadFile(event,user){
    const file = event.target.files[0];
    const now =  new Date().getTime() ; 
    const filePath = 'archivo_subido' + now ;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    
    task.snapshotChanges().pipe(finalize(() => {
      ref.getDownloadURL().subscribe((link)=>{
        this.afs.collection('subidos').doc(now.toString()+`${user.uid}`).set({
          linkimagensubida : link,
          uid : user.uid ,
          email: user.email, 
          displayName: user.displayName, 
          photoURL:user.photoURL,
          comentario : this.value 
        })
        this.url = link;
      })
    })
    ).subscribe();
    task.percentageChanges().subscribe((percent)=>{
      this.percent = percent;
    })
  }

  getsubidos(): void{
    this.juegoService.getsubidos()
    .subscribe((subidos) => { this.subidos = subidos });
  }
  ngOnInit(): void {
    this.getsubidos();
  }
}
