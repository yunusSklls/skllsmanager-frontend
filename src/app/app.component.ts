import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Person } from './person';
import { PersonService } from './person.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
  //variable that's goin to hold all of the persons that coming from the backend as Person Array
  public persons: Person[] | undefined;
  public editPerson: Person | undefined;

  constructor( private personsService: PersonService ) { }

  ngOnInit()
  {
    this.getPersons();
  }

  public getPersons(): void
  {
    this.personsService.getPersons().subscribe(
      (response: Person[]) => {
        this.persons = response;
      },
      (error: HttpErrorResponse ) => {
        alert(error.message);
      }
    );
  }

  public onAddPerson( addForm: NgForm ): void 
  {
    //close the model
    document.getElementById('add-person-form')?.click();
    this.personsService.addPerson(addForm.value).subscribe( 
      ( response: Person ) => {
        console.log( response );
        this.getPersons();
        addForm.reset();
      },
      ( error: HttpErrorResponse ) => {
        alert( error.message );
        addForm.reset();
      }
     );
  }

  public onUpdatePerson( person: Person ): void 
  {
    this.personsService.updatePerson(person).subscribe( 
      ( response: Person ) => {
        console.log( response );
        this.getPersons();
      },
      ( error: HttpErrorResponse ) => {
        alert( error.message );
      }
     );
  }

  //pass a person and a mode (what exactly the user is trying to do)
  public onOpenModal(person: Person, mode: string): void
  {
    //to access to the entire div in app.component.html
    const container = document.getElementById( 'main-container' );
    const button = document.createElement( 'button' );

    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute( 'data-toggle', 'modal' );
    if ( mode == 'add' ) 
    {
      button.setAttribute('data-target', '#addPersonModal' );
    }
    if ( mode == 'edit' ) 
    {
      this.editPerson = person;
      button.setAttribute('data-target', '#updatePersonModal' );
    }
    if ( mode == 'delete' ) 
    {
      button.setAttribute('data-target', '#deletePersonModal' );
    }
    container?.appendChild( button );
    button.click();
  }
}
