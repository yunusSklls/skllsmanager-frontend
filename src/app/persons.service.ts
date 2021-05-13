import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persons } from './persons';

@Injectable({
    providedIn: 'root'
})
export class PersonsService {
    //to pass the url, see in the below functions. An empty string, to pu the url later.
    private apiServerUrl = '';

    //this is a built-in http client that we can use to make http request and we can just injecet it in the surface so that we can use it.
    constructor( private http: HttpClient ) {}
    //interface for the request are going to be returning in Observable< GENERICS >, look persons.ts
    // this is going to return an obserable of persons array
    //returning a persons array of the javaScript perspective or from a 
    //java perspective that's just going to be a list or any type of collection
    public getPersons(): Observable<Persons[]> 
    {
        //${...} this is an javascript notation that can be use to put variables, and then string at the same time
        return this.http.get<Persons[]>(`${this.apiServerUrl}/persons/all`);                
    }

    public addPerson( person: Persons ): Observable<Persons> 
    {
        return this.http.post<Persons>(`${this.apiServerUrl}/persons/add`, person);                
    }

    public updatePerson( person: Persons ): Observable<Persons> 
    {
        return this.http.put<Persons>(`${this.apiServerUrl}/persons/update`, person);                
    }

    public deletePerson( personId: number ): Observable<void> 
    {
        return this.http.delete<void>(`${this.apiServerUrl}/persons/delete/${personId}`);                
    }
}