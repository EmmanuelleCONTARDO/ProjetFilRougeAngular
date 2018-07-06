import { BodyComponent } from './body/body.component';
  import { RecettesComponent } from './recettes/recettes.component';
import { Injectable } from '@angular/core';
import { FoodsGroup, AutoComplFoodsGroup,  Foods, AutoComplFoods, ListFoods } from './foods_group';
import { HttpClient } from '@angular/common/http';
 import {exhaustMap, map, mergeMap, catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class FoodsService {
 constructor(private http: HttpClient) {
   this.getAllFoods(); this.getFoodById(this.id); this.getFoodByName(this.name);
  //  this.selectedGroup = {categorie: 'a', foods: ['a', 'b']};
 }


 public request = new XMLHttpRequest();
//  public selectedGroup: AutoComplFoodsGroup;
public id: number;
public name: string;

  public autoCFG: AutoComplFoodsGroup[] = [];
  public autoCFG2: AutoComplFoods[] = [];
  public listFood: ListFoods[] = [];

  public oneFoodGetByName: Foods;
  public oneFoodGetById: Foods;



  getFoodByName(f: string) {
    this.http.get<Foods>('http://localhost:8090/foods' + '/' + f)
    .subscribe(data => this.oneFoodGetByName = data);
  }

  getFoodById(id: number) {
    this.http.get<Foods>('http://localhost:8090/foods' + '/' + id)
    .subscribe(data => this.oneFoodGetById = data);
  }


  getAllFoods() {
    this.http.get<Foods[]>('http://localhost:8090/foods')
    .subscribe(data => this.formaterAutoCompl(data));
  }



 formaterAutoCompl(f: Foods[]) {
   let i: number;
  for (i = 0 ; i < f.length; i++) {
    let  j: number;
    const foodsByCat = [] ;
     if ((f[i]['foodsGroup'] !== null) && (f[i]['foodsGroup'] !== undefined)     )  {
      for (j = i  ;  (j < f.length) && (f[j]['foodsGroup'] !== null)
                    && (f[j]['foodsGroup'] !== undefined)
                   && (f[j]['foodsGroup']['name'] === f[i]['foodsGroup']['name'])
                   ; j++ ) {
           foodsByCat.push(f[j]['name']);
           this.autoCFG2.push({value: f[j]['name'], title: f[j]['name']}) ;
          console.log(f[j]['name'] + ' s ' + f[j]['foodsGroup']['name'] +  f[j]['foodsGroup']['id'] + ' t ');
           this.listFood.push(
            {id: f[j]['id'],
          name: f[j]['name'],
          categorie: f[j]['foodsGroup']['name'],
          glycIndex: f[j]['glycIndex'],
          energy: f[j]['energy'],
        carboHydrates: f[j]['carboHydrates'],
        proteins: f[j]['proteins'],
      lipids: f[j]['lipids'],
    comment: f[j]['comment']
          });


      }
      this.autoCFG.push({categorie: f[i]['foodsGroup']['name'], foods: foodsByCat });
      i = j - 1 ;
      } else { this.autoCFG.push({categorie: f[i]['name'], foods: [f[i]['name']] }) ;
                this.autoCFG2.push({value: f[i]['name'], title: f[i]['name'] });
    }
    }

    // return this.autoCFG2;

  }



}
