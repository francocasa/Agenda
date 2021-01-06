import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ListItem } from 'src/app/models/list-item.model';
import { Lista } from 'src/app/models/list.model';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem = '';

  constructor( public toDoService:ToDoService, private router:Router, private activatedRoute:ActivatedRoute, public alertController:AlertController) { 
    const listaId = this.activatedRoute.snapshot.paramMap.get('listaId');

    this.lista = this.toDoService.obtenerLista(listaId);
  }

  ngOnInit() {
  }

  agregarItem(event:KeyboardEvent)
  {
    if(event.key == "Enter")
      {
        if(this.nombreItem.length === 0 )
        {
          return;
        }
        const nuevoItem = new ListItem(this.nombreItem);
        this.lista.items.push(nuevoItem);
        this.lista.itemsFaltantes = this.lista.items.filter(itemData => !itemData.complete).length; 
        this.toDoService.guardarAlmacenamiento();
      }
  }

  cambioCheck(item:ListItem)
  {
    this.lista.itemsFaltantes = this.lista.items.filter(itemData => !itemData.complete).length; 

    if (this.lista.itemsFaltantes === 0 ) {
      this.lista.terminadaEn = new Date();
      this.lista.completada = true;
    }
    else
    {
      this.lista.terminadaEn = null;
      this.lista.completada = false;
    }

    this.toDoService.guardarAlmacenamiento();
  }

  async eliminarItem(i:number)
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
            this.lista.items.splice(i, 1);
            this.toDoService.guardarAlmacenamiento();
          }
        }
      ]
    });
    alert.present();
  }




}
