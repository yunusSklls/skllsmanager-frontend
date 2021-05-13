import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';

@Injectable({providedIn: 'root'})
export class PersonService {
    //to pass the url, see in the below functions. An empty string, to pu the url later.
    private apiServerUrl = '';

    //this is a built-in http client that we can use to make http request and we can just injecet it in the surface so that we can use it.
    constructor( private http: HttpClient ) {}
    //interface for the request are going to be returning in Observable< GENERICS >, look persons.ts
    // this is going to return an obserable of persons array
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