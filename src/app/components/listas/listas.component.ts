import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from 'src/app/services/to-do.service';

import { AlertController } from '@ionic/angular';
import { Lista } from 'src/app/models/list.model';
import { CompileTemplateMetadata } from '@angular/compiler';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @Input() completada:boolean;

  constructor(public toDoService:ToDoService, private router:Router, public alertController:AlertController) { }

  ngOnInit() {
  }


  listaSeleccionada(lista:Lista)
  {
    if(lista.completada == true)
    {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }
    else
    {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  async eliminarLista(i:number)
  {
    const alert = await this.alertController.create({
      header: 'Alert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: (data) =>{
            this.toDoService.lists.splice(i, 1);
            this.toDoService.guardarAlmacenamiento();
          }
        }
      ]
    });
    alert.present();
  }

}
