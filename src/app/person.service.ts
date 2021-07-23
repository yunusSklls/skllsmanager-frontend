import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person';
import { environment } from 'src/environments/environment';

//let the entire angular application app know about the service (the root component of our app)
@Injectable({ providedIn: 'root' })
export class PersonService 
{
  //to pass the url whiCh was defined in the environment.ts
  private apiServerUrl = environment.apiBaseUrl;

  constructor( private http: HttpClient ) { }
  //interface for the request are going to be returning in Observable< GENERICS >, look persons.ts
  // this is going to return an Observable of persons array
  //returning a persons array of the javaScript perspective or from a 
  //java perspective that's just going to be a list or any type of collection
  public getPersons(): Observable<Person[]> 
  {
    //${...} this is an javascript notation that can be use to put variables, and then string at the same time
    return this.http.get<Person[]>(`${this.apiServerUrl}/person/all`);                
  }

  public addPerson( person: Person ): Observable<Person> 
  {
      return this.http.post<Person>(`${this.apiServerUrl}/person/add`, person);                
  }

  public updatePerson( person: Person ): Observable<Person> 
  {
      return this.http.put<Person>(`${this.apiServerUrl}/person/update`, person);                
  }

  public deletePerson( personId: number ): Observable<void> 
  {
      return this.http.delete<void>(`${this.apiServerUrl}/person/delete/${personId}`);                
  }

}
