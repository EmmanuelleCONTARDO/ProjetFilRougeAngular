import { FoodsService } from './../foods.service';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Foods, ListFoods } from '../foods_group';





@Component({
  selector: 'app-aliments',
  templateUrl: './aliments.component.html',
  styleUrls: ['./aliments.component.css'],


})

export class AlimentsComponent implements OnInit {



  settings = {
    actions: {
      position: 'right',
      columnTitle: '',

      delete: {
        // deleteButtonContent: 'Supprimer',
        confirmDelete: true,
        deleteButtonContent: '  <span class="glyphicon glyphicon-remove table-actions-button"></span>  ',
        mode: 'external'
      },
      add: {
        // addButtonContent: 'Ajouter',
        confirmCreate: true,
        addButtonContent: '<span class="glyphicon glyphicon-plus">'
      },
      edit: {
        confirmSave: true,
        editButtonContent: '<span class="glyphicon glyphicon-pencil"></span>'
      },
    },
    setPaging: true,

    pager: {
      display: true,
    },
    columns: {
      id: {
        title: 'Identifiant',
        editable: false,
        sort: true,
        filter: true,
        // show: false,
      },
      name: {
        title: 'Aliment',
        editable: true,
        sort: true,
        width: '30%',
        filter: true,
        editor: {
          type: 'textarea',
        },
      },
      categorie: {
        title: 'Catégorie',
        editable: true,
        sort: true,
        filter: true,
      },
      glycIndex: {
        title: 'IG (pour 100gr)   ',
        editable: true,
        filter: true,
      },
      energie: {
        title: 'Energie',
        editable: false,
        filter: true,
      },
      // portion: {
      //   title: 'Portion (en gr)',
      //   editable: true,
      //   filter: false,
      // },
      carboHydrates: {
        title: 'Glucides',
        editable: true,
        filter: true,

      },
      cg: {
        title: 'CG',
        editable: false,
        filter: true,
      },
      proteins: {
        title: 'Proteines',
        editable: false,
        filter: true,
      },
      lipids: {
        title: 'Lipides',
        editable: false,
        filter: true,
      },
      comments: {
        title: 'Commentaires',
        editable: true,
        editor: {
          type: 'textarea',
        },
        width: '30%',
        filter: true,
      },


    },
  };



  source: LocalDataSource;

  constructor(public foodsService: FoodsService) {
  }

  ngOnInit() {
    this.foodsService.getAllFoods()
      .subscribe((foods) => {
        this.source = new LocalDataSource(this.formaterSource(foods));
      });
  }

  // Permet de formater la donnée source utilisé comme propriété de ng2-smart-table
  formaterSource(f: Foods[]): ListFoods[] {

    const listFoods: ListFoods[] = [];

    let i: number;
    for (i = 0; i < f.length; i++) {
      let cat: string;
      if ((f[i]['foodsGroup'] !== null)
        && (f[i]['foodsGroup'] !== undefined)) {
        cat = f[i]['foodsGroup']['name'];
      } else { cat = f[i]['name']; }

      listFoods.push(
        {
          id: f[i]['id'],
          name: f[i]['name'],
          categorie: cat,
          glycIndex: f[i]['glycIndex'],
          energy: f[i]['energy'],
          carboHydrates: f[i]['carboHydrates'],
          proteins: f[i]['proteins'],
          lipids: f[i]['lipids'],
          comment: f[i]['comment']
        });
    }
    return listFoods;
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    this.calculateCg(event.newData);
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
    this.source.refresh();
  }

  onCreateConfirm(event) {
    this.calculateCg(event.newData);
    if (window.confirm('Are you sure you want to create   ?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
    this.source.refresh();
  }

  onEditConfirm(event) {
    this.calculateCg(event.newData);
  }

  calculateCg(object) {
    // object.cg = 1;
    object.cg = (object.ig * (object.glucides * object.portion) / 100) / 100;
  }

  // onSearch(query: string = '') {
  //   this.source.setFilter([
  //     // fields we want to include in the search
  //     {
  //       field: 'nameAliment',
  //       search: query
  //     },
  //     {
  //       field: 'ig',
  //       search: query
  //     },

  //   ], false);
  //   // second parameter specifying whether to perform 'AND' or 'OR' search
  //   // (meaning all columns should contain search query or at least one)
  //   // 'AND' by default, so changing to 'OR' by setting false here
  // }





}

