import { Component, OnInit } from '@angular/core';
import { AutocompletionService} from './../autocompletion.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import {StateGroup } from './../state_group';


@Component({
  selector: 'app-aliments',
  templateUrl: './aliments.component.html',
  styleUrls: ['./aliments.component.css']

})

export class AlimentsComponent implements OnInit {


  stateForm: FormGroup = this.fb.group({
    stateGroup: '',
  });

 stateGroupOptions: Observable<StateGroup[]>;

  constructor(public autocompletionService: AutocompletionService, private fb: FormBuilder) { }

  ngOnInit() {
    this.stateGroupOptions = this.stateForm.get('stateGroup').valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterGroup(val))
      );
}


 // constructor(private fb: FormBuilder) { }

 filterGroup(val: string): StateGroup[] {
  if (val) {
    return this.autocompletionService.stateGroups
      .map(group => ({ letter: group.letter, names: this._filter(group.names, val) }))
      .filter(group => group.names.length > 0);
  }

  return this.autocompletionService.stateGroups;
}

  private _filter(opt: string[], val: string) {
    const filterValue = val.toLowerCase();
    return opt.filter(item => item.toLowerCase().startsWith(filterValue));
  }
}
