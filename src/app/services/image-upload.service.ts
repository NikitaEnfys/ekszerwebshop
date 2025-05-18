// src/app/services/image-upload.service.ts
import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Observable, lastValueFrom, from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ImageUploadService {
  constructor(private storage: Storage) {}

  /**
   * Feltölt egy File-t, és visszaadja a download URL-t.
   */
  async uploadFileAndGetUrl(file: File, path: string): Promise<string> {
    const storageRef = ref(this.storage, path);
    const task = uploadBytesResumable(storageRef, file);
    // várjuk meg, míg kész:
    await lastValueFrom(from(new Promise<void>((res, rej) => {
      task.on('state_changed',
        () => {},
        err => rej(err),
        () => res()
      );
    })));
    // majd a download URL:
    return getDownloadURL(storageRef);
  }
}
