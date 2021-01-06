import { Injectable } from '@angular/core';
import { Lista } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  lists : Lista[] = [];


  constructor() {
    this.cargarAlmacenamiento();
  }



  crearLista( titulo:String)
  {
    const nuevaLista = new Lista(titulo);
    this.lists.push(nuevaLista);
    this.guardarAlmacenamiento();

    return nuevaLista.id;
  }

  obtenerLista(listaId: string | number)
  {
    listaId = Number(listaId);

    return this.lists.find(listaData => listaData.id === listaId);
  }

  guardarAlmacenamiento()
  {
    localStorage.setItem('data', JSON.stringify(this.lists));
  }

  cargarAlmacenamiento()
  {
    if(localStorage.getItem('data'))
    {
      this.lists = JSON.parse(localStorage.getItem('data'));
    }else
    {
      this.lists = [];
    }
  }


}
