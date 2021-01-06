import { ListItem } from "./list-item.model";


export class Lista{
    id: number;
    titulo: String;
    creadaEn: Date;
    terminadaEn: Date;
    completada: boolean;
    items: ListItem[];
    itemsFaltantes: number;

    constructor(titulo:String)
    {
        this.titulo = titulo;
        this.creadaEn = new Date();
        this.completada = false;
        this.items = [];
        this.id = new Date().getTime();
        this.itemsFaltantes = this.items.length;
        
    }
}


