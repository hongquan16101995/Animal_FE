import {Species} from "./species";

export interface Animal {
  id: number,
  name: string,
  image: string,
  age: number,
  quantity: number,
  price: number,
  species: Species
}
