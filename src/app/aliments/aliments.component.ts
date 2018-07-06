import { Component, OnInit } from '@angular/core';
import { FoodsService} from './../foods.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
  import { FoodsGroup, AutoComplFoodsGroup,  Foods } from './../foods_group';



@Component({
  selector: 'app-aliments',
  templateUrl: './aliments.component.html',
  styleUrls: ['./aliments.component.css']

})

export class AlimentsComponent implements OnInit {


  foodForm: FormGroup = this.fb.group({
    foodsGroup: ''
  });

 foodsGroupOptions: Observable<AutoComplFoodsGroup[]>;

  constructor(public autocompletionService: FoodsService, private fb: FormBuilder) { }

  ngOnInit() {
     this.foodsGroupOptions = this.foodForm.get('foodsGroup').valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterGroup(val))
      );
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
