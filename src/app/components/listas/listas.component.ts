import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToDoService } from 'src/app/services/to-do.service';

import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/list.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( IonList ) lista: IonList;
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
      header: 'Eliminar lista',
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
  
  async cambiarNombreLista(lista:Lista)
  {
    console.log(lista.titulo)
    const alert = await this.alertController.create({
      header: 'Cambiar nombre:' + lista.titulo,
      inputs:[
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista',
          value: lista.titulo
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cambiar',
          handler: (data) =>{
            lista.titulo = data.titulo;
            this.toDoService.guardarAlmacenamiento();
          }
        }
      ]
    });
    
    this.lista.closeSlidingItems();
    alert.present();
    
  }


}
