import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { FoodsGroup, AutoComplFoodsGroup,  Foods, AutoComplFoods } from './../foods_group';
import { FoodsService} from './../foods.service';
import { Column } from 'ng2-smart-table/lib/data-set/column';



@Component({
  selector: 'app-aliments',
  templateUrl: './aliments.component.html',
  styleUrls: ['./aliments.component.css'],
})

export class AlimentsComponent  {

  constructor(public foodsService: FoodsService) {
    this.source = new LocalDataSource(this.data);
  }

  settings = {
    Supprimer: {
      confirmDelete: true,
    },
    Ajouter: {
      confirmCreate: true,
    },
    Modifier: {
      confirmSave: true,
    },
    columns: {
      id: {
        title: 'Identifiant',
        editable: false,
        sort: true,
        filter: true,
      },
      name: {
        title: 'Aliment',
        editable: true,
        sort: true,
        width: '30%',
        filter: true,
        // filter: {
        //   type: 'list',
        //   config: {
        //     selectText: ' ',
        //     list:  this.foodsService.autoCFG2,
        //   },
        // },
      },
      categorie: {
        title: 'Catégorie',
        editable: false,
        sort: true,
        filter: true,
      },
      glycIndex: {
        title: 'Indice Glycémique',
        editable: false,
        sort: true,
        filter: true,
      },
      energy: {
        title: 'Glucides',
        editable: false,
        sort: true,
        filter: true,
      },
      carboHydrates : {
        title: 'Energie',
        editable: false,
        sort: true,
        filter: true,

      },
      proteins : {
        title: 'Protéine',
        editable: false,
        sort: true,
        filter: true,

      },
      lipids : {
        title: 'Lipide',
        editable: false,
        sort: true,
        filter: true,

      },
      comment : {
        title: 'Commentaire',
        editable: true,
        sort: true,
        filter: true,
      },
    },
  };

  data = this.foodsService.listFood;

  source: LocalDataSource;



//   rowSelect(event) {
// }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }







  // displayedColumns: string[] = ['nameFood', 'ig', 'portion', 'glucides', 'cg', 'energie', 'proteines', 'lipides', 'commentaires' ];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);



  // typeMeal = [
  //   {value: 'petitdej-0', viewValue: 'Petit-Dejeuner'},
  //   {value: 'dej-1', viewValue: 'Dejeuner'},
  //   {value: 'diner-2', viewValue: 'Diner'}
  // ];

  // addRow () {
  //   ELEMENT_DATA.push(tomate);
  //   this.dataSource._updateChangeSubscription();
  // }


}

