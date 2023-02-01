import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Species} from "../model/species";
import {Animal} from "../model/animal";
import {environment} from "../../environments/environment";

const apiUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})

export class AnimalService {

  constructor(private httpClient: HttpClient) { }

  findAllSpecies(): Observable<Species[]> {
    return this.httpClient.get<Species[]>(`${apiUrl}/animal/species`)
  }

  findSpecies(id: number): Observable<Species> {
    return this.httpClient.get<Species>(`${apiUrl}/animal/species/${id}`)
  }

  findAllAnimal(): Observable<Animal[]> {
    return this.httpClient.get<Animal[]>(`${apiUrl}/animal`)
  }

  findAnimal(id: number): Observable<Animal> {
    return this.httpClient.get<Animal>(`${apiUrl}/animal/${id}`)
  }

  save(animal: Animal): Observable<any> {
    return this.httpClient.post(`${apiUrl}/animal`, animal)
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${apiUrl}/animal/${id}`)
  }
}
