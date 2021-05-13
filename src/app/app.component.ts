import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persons } from './persons';
import { PersonsService } from './persons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  public persons: Persons[];

  constructor( private personsService: PersonsService ) { }

  ngOnInit()
  {
    this.getPersons();
  }

  public getPersons(): void
  {
    this.personsService.getPersons().subscribe(
      ( response: Persons[]) => {
        this.persons = response;
      },
      (error: HttpErrorResponse ) => {
        alert(error.message);
      }
    )
  }


}
