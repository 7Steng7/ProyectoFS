import { Injectable } from '@angular/core';
import { AngularFireStorageModule, BUCKET, AngularFireStorage} from '@angular/fire/storage'
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private storage: AngularFireStorage) { }

  uploadFile(event){
    const file = event.target.files[0];
    const filePath = 'archivo_subido'+ new Date().getTime();
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(finalize(() => {
      this.downloadURL = ref.getDownloadURL();
    }))
    .subscribe()
  }
  
}
