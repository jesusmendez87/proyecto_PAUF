import { IUser } from './../../core/models/user.model';
import { userService } from './../../core/services/ver-usuario';
import { Navbar } from './../../shared/components/navbar/navbar';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arbitros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './arbitros.html',
  styleUrl: './arbitros.css',
})
export class Arbitros  implements OnInit{
protected iuser : IUser[]=[];

 constructor( protected user: userService,
 ){}

 ngOnInit(){

this.cargarArbitros();
 }

  cargarArbitros() {
    this.user.getUsersByRole("arbitro").subscribe({
      next: (data: IUser[]) => {
        this.iuser = data;
        console.log('Árbitros cargados:', this.iuser);
      },
      error: (err) => {
        console.error('Error cargando árbitros:', err);
      }
    });
  }


}

