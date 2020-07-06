import { Component, OnInit } from '@angular/core';
import { JuegosService } from '../../services/juegos.service';
import { Noticia } from '../../interfaces/noticia';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss']
})
export class NoticiasComponent implements OnInit {
  panelOpenState = false;
  noticias : Noticia[];

  constructor(private noticiaService: JuegosService) { }

  getnoticias(): void{
    this.noticiaService.getnoticias()
    .subscribe((noticias) => { this.noticias = noticias });
  }
  ngOnInit(): void {
    this.getnoticias();
  }

}
