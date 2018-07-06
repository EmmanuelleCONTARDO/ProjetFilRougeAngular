import { BodyComponent } from './body/body.component';
  import { RecettesComponent } from './recettes/recettes.component';
import { Injectable } from '@angular/core';
import { FoodsGroup, AutoComplFoodsGroup,  Foods } from './foods_group';
import { HttpClient } from '@angular/common/http';
 import {exhaustMap, map, mergeMap, catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class FoodsService {
 constructor(private http: HttpClient) {
   this.getAliment();
  //  this.selectedGroup = {categorie: 'a', foods: ['a', 'b']};
 }


 public request = new XMLHttpRequest();
//  public selectedGroup: AutoComplFoodsGroup;

  public autoCFG: AutoComplFoodsGroup[] = [];


  getAliment() {


    this.http.get<Foods[]>('http://localhost:8090/foods')
    .subscribe(data => console.log(this.formaterAutoCompl(data)));
 }

 formaterAutoCompl(f: Foods[]): AutoComplFoodsGroup[] {
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

      }
      this.autoCFG.push({categorie: f[i]['foodsGroup']['name'], foods: foodsByCat });
      i = j - 1 ;
      } else { this.autoCFG.push({categorie: f[i]['name'], foods: [f[i]['name']] }) ;
            }
    }


  return this.autoCFG;
  }



}
