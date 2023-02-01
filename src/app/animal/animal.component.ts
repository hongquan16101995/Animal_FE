import {Component, OnInit} from '@angular/core';
import {AnimalService} from "../service/animal.service";
import {Animal} from "../model/animal";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  animals: Animal[] = []

  constructor(private animalService: AnimalService) {
  }

  ngOnInit() {
    this.animalService.findAllAnimal().subscribe((data) => {
      this.animals = data
    })
  }

  delete(id: number) {
    if (confirm("Are you want to delete this animal?")) {
      this.animalService.delete(id).subscribe(() => {
        this.ngOnInit()
      })
    }
  }
}
