import { Component, OnInit } from '@angular/core';
import { MenuService } from './../menu.service';
import { FoodsService} from './../foods.service';

import { AutocompletionService} from './../autocompletion.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {StateGroup } from './../state_group';
import { FoodsGroup, AutoComplFoodsGroup,  Foods } from './../foods_group';




@Component({
  selector: 'app-repas',
  templateUrl: './repas.component.html',
  styleUrls: ['./repas.component.css']
})
export class RepasComponent implements OnInit {

  typeMeal = [
    {value: 'petitdej-0', viewValue: 'Petit-Dejeuner'},
    {value: 'dej-1', viewValue: 'Dejeuner'},
    {value: 'diner-2', viewValue: 'Diner'}
  ];

  foodForm: FormGroup = this.fb.group({
    foodsGroup: ''
  });

foodsGroupOptions: Observable<AutoComplFoodsGroup[]>;

  constructor(public menuService: MenuService, public autocompletionService: FoodsService, private fb: FormBuilder) { }



//  cloneRow() {
//     const row = document.getElementById('rowToClone'); // find row to copy
//     const table = document.getElementById('tableau'); // find table to append to
//     const clone = row.cloneNode(true); // copy children too
//     // clone.id = 'newID'; // change id or other attributes/contents
//     table.appendChild(clone); // add new row to end of table
//   }








  ngOnInit() {
    this.foodsGroupOptions = this.foodForm.get('foodsGroup').valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterGroup(val))
      );

      this.row.push({
        id: '',
        name: '',
       age: ''
     });
}
// tslint:disable-next-line:member-ordering
public row: any = [{}];

// Add New Row
addRow() {
  this.row.push({});
}

 // constructor(private fb: FormBuilder) { }
 filterGroup(val: string): AutoComplFoodsGroup[] {
  if (val) {
    return this.autocompletionService.autoCFG
    .map(group => ({ categorie: group.categorie, foods: this._filter(group.foods, val) }))
    .filter(group => group.foods.length > 0);
  }

  return this.autocompletionService.autoCFG;
}

  private _filter(opt: string[], val: string) {
    const filterValue = val.toLowerCase();
    return opt.filter(item => item.toLowerCase().startsWith(filterValue));
  }
}




