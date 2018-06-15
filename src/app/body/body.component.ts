import { Component, OnInit } from '@angular/core';
import { MenuService } from './../menu.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  typeMeal = [
    {value: 'petitdej-0', viewValue: 'Petit-Dejeuner'},
    {value: 'dej-1', viewValue: 'Dejeuner'},
    {value: 'diner-2', viewValue: 'Diner'}
  ];
  constructor(public menuService: MenuService) { }

  ngOnInit() {
  }

}
