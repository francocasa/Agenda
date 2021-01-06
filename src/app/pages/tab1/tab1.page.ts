import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public toDoService:ToDoService, private router:Router, public alertController:AlertController) {

  }




  async agregarLista() {
    const alert = await this.alertController.create({
      header: 'Agregar Lista',
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Crear',
          handler: (data) =>{
            if(data.titulo.length === 0)
            {
              return;
            }
            const listaId = this.toDoService.crearLista(data.titulo);

            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
        }
      ]
    });
    alert.present();
  }



}
