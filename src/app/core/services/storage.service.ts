import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storageReady: Promise<Storage>;

  constructor(private storage: Storage) {
    this.storageReady = this.storage.create();
  }

  async get<T>(key: string): Promise<T | null> {
    const storage = await this.storageReady;
    return storage.get(key);
  }

  async set<T>(key: string, value: T): Promise<void> {
    const storage = await this.storageReady;
    await storage.set(key, value);
  }

  async remove(key: string): Promise<void> {
    const storage = await this.storageReady;
    await storage.remove(key);
  }

  async keys(): Promise<string[]> {
    const storage = await this.storageReady;
    return storage.keys();
  }
}
