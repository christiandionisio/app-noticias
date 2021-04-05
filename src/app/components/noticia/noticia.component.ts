import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { Plugins } from '@capacitor/core';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() index: number;
  @Input() inFavoritos;

  constructor(private actionSheetCtrl: ActionSheetController,
              private dataLocalService: DataLocalService,
              public toastController: ToastController) { }

  ngOnInit() {}

  abrirNoticia() {
    // console.log('Noticia', this.noticia.url);
    const { Browser } = Plugins;
    Browser.open({ url: this.noticia.url });
  }

  async lanzarMenu() {

    let guardarBorrarBtn;

    if (this.inFavoritos) {

      guardarBorrarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        handler: () => {
          console.log('Borrar Favorito');
          this.dataLocalService.borrarNoticia(this.noticia);
          this.presentToast('Se ha borrado de favoritos');
        }
      };

    } else {
      guardarBorrarBtn = {
        text: 'Añadir Favorito',
        icon: 'star',
        handler: () => {
          console.log('Añadir Favorito');
          this.dataLocalService.guardarNoticia(this.noticia);
          this.presentToast('Noticia agregada a favoritos.');
        }
      };
    }

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          const { Share } = Plugins;
          let shareRet = Share.share({
            title: this.noticia.title,
            text: this.noticia.description,
            url: this.noticia.url,
            dialogTitle: this.noticia.source.name
          });
        }
      },

      guardarBorrarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
