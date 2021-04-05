import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService implements OnInit {

  noticias: Article[] = [];

  constructor(private storage: Storage) {
    this.cargarFavoritos();
  }

  async ngOnInit() {


  }


  async guardarNoticia(noticia: Article) {

    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if (!existe) {
      this.noticias.unshift(noticia);
      await this.storage.create();
      this.storage.set('favoritos', this.noticias);
    }

  }

  async cargarFavoritos() {
    await this.storage.create();
    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.noticias = favoritos;
    }

  }

  async borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    await this.storage.create();
    this.storage.set('favoritos', this.noticias);
  }
}
