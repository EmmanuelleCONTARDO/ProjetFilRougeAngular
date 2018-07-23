import { FoodRow } from './../food-row';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AutoComplFoodsGroup, Foods } from '../foods_group';
import { MenuService } from '../menu.service';
import { FoodsService } from '../foods.service';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-line-food',
  templateUrl: './line-food.component.html',
  styleUrls: ['./line-food.component.css']
})
export class LineFoodComponent implements OnInit {

  foodForm: FormGroup = this.fb.group({
    foodsGroup: ''
  });

  foodsGroupOptions: Observable<AutoComplFoodsGroup[]>;

  public autoCFG: AutoComplFoodsGroup[] = [];

  @Input() foodRow: FoodRow;
  @Input() index: number;
  @Output() deleted = new EventEmitter<number>();

  constructor(public menuService: MenuService,
    public foodsService: FoodsService,
    private fb: FormBuilder) { }


  ngOnInit() {
    this.foodsService.getAllFoods()
      .subscribe((foods) => {
        this.autoCFG = this.formaterAutoCompl(foods);
        console.log(this.autoCFG);
      });
    this.foodsGroupOptions = this.foodForm.get('foodsGroup').valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterGroup(val)));
  }

  filterGroup(val: string): AutoComplFoodsGroup[] {
    if (val) {
      return this.autoCFG
        .map(group => ({ categorie: group.categorie, foods: this._filter(group.foods, val) }))
        .filter(group => group.foods.length > 0);
    }
    return this.autoCFG;
  }
  // private _filter(opt: string[], val: string) {
  private _filter(opt, val) {
    const filterValue = (typeof val === 'string') ? val.toLowerCase() : val.name.toLowerCase();
    // return opt.filter(item => item.toLowerCase().startsWith(filterValue));
    return opt.filter(item => {
      return (typeof item === 'string') ? item.toLowerCase().startsWith(filterValue) : item.name.toLowerCase().startsWith(filterValue);
    });
  }
  displayFn(f): string | undefined {
    return f ? f.name : undefined;
  }
  formaterAutoCompl(f: Foods[]): AutoComplFoodsGroup[] {
    let i: number;
    // const autoCFG: AutoComplFoodsGroup[] = [];
    const autoCFG = [];
    for (i = 0; i < f.length; i++) {
      let j: number;
      const foodsByCat = [];
      if (f[i]['foodsGroup']) {
        for (j = i; (j < f.length) && f[j]['foodsGroup']
          && (f[j]['foodsGroup']['name'] === f[i]['foodsGroup']['name'])
          ; j++) {
          // foodsByCat.push(f[j]['name']);
          foodsByCat.push({ name: f[j]['name'], id: f[j]['id'], ig: f[j]['glycIndex'], glucide: f[j]['carboHydrates'] });
        }
        autoCFG.push({
          categorie: f[i]['foodsGroup']['name'],
          foods: foodsByCat
        });
        i = j - 1;
      } else {
        autoCFG.push({
          categorie: f[i]['name'],
          // foods: [ f[i]['name']]
          foods: [{ name: f[i]['name'], id: f[i]['id'], ig: f[i]['glycIndex'], glucide: f[i]['carboHydrates'] }]
        });
      }
    }
    return autoCFG;
  }

  getFood() {
    console.log('Methode getFood ', this.foodRow);
    //  setTimeout( () => {this.foodsRow[i].ig = this.foodsRow[i].nameFood.glycIndex; }, 0);
    // if (this.foodsRow[i].nameFood) {
    this.foodRow.ig = this.foodRow.nameFood.ig;
    this.foodRow.glucides = this.foodRow.nameFood.glucide;
    // }
  }

  calculCG(i: number) {
    console.log('ch=' + ((this.foodRow.ig * (this.foodRow.glucides * this.foodRow.portion) / 100) / 100).toFixed(2));
    this.foodRow.cg = (this.foodRow.ig * (this.foodRow.glucides * this.foodRow.portion) / 100) / 100;
    this.foodRow.cg = Number.parseFloat(Number(this.foodRow.cg).toFixed(2));
    // return (this.foodsRow[i].ig * (this.foodsRow[i].glucides * this.foodsRow[i].portion) / 100) / 100;
    // cg.value= (ig.value * (glucides.value* portion.value)/100)/100
  }


  deleteFoodRow(index: number) {
    this.deleted.emit(index);
    console.log(index);
  }
}
