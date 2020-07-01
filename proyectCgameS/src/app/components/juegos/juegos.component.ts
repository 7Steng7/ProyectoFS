import { Component, OnInit } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
import { Juego } from '../../interfaces/juego';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {

  juegos : Juego[];

  constructor(private juegoService: JuegosService) { }

  getjuegos(): void{
    this.juegoService.getjuegos()
    .subscribe((juegos) => { this.juegos = juegos });
  }
  ngOnInit(): void {
    this.getjuegos();
  }

}
