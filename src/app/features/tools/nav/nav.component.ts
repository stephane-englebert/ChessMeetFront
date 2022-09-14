import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  items: MenuItem[] = [];
  isLogged: Boolean;
  isAdmin: Boolean;
  pseudo: string = "";

  constructor(
    private _router: Router
  ) {
    this.isLogged = (localStorage.getItem('isLogged') == "true");
    this.isAdmin = (localStorage.getItem('isAdmin') == "true");
    if(this.isLogged){this.pseudo = localStorage.getItem('pseudo')!;}
  }
  
  ngOnInit() {
    if(this.isAdmin){
      this.items = [
          {
            label: 'ChessMeet', routerLink: '/tournaments/index'
          },
          {
              label: 'Tournois',
              items: [
                  {label: 'Index', routerLink: '/tournaments/index'},
                  {label: 'Nouveau', routerLink: '/tournaments/add'}
              ]
          },
          {
              label: 'Membres',
              items: [
                  {label: 'Liste', routerLink: '/members/list'},
                  {label: 'Ajouter', routerLink: '/members/add'}
              ]
          }
      ];
    }else if (this.isLogged){
        this.items = [
          {
            label: 'ChessMeet', routerLink: '/tournaments/index'
          },
          {
              label: 'Tournois',
              items: [
                  {label: 'Index', routerLink: '/tournaments/index'}
              ]
          },
          {
              label: 'Membres',
              items: [
                  {label: 'Liste', routerLink: '/members/list'},
                  {label: 'Ajouter', routerLink: '/members/add'}
              ]
          }
      ];
    }else{
      this.items = [
          {
            label: 'ChessMeet', routerLink: '/tournaments/index'
          },
          {
              label: 'Tournois',
              items: [
                  {label: 'Index', routerLink: '/tournaments/index'}
              ]
          }
      ]
    }
  }

  logout(){
    localStorage.clear();
    location.reload();
  }
}
