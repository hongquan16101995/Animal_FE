import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AnimalService} from "../service/animal.service";
import {Animal} from "../model/animal";
import {FormControl, FormGroup} from "@angular/forms";
import {Species} from "../model/species";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  animal!: Animal
  formAnimal!: FormGroup
  species: Species[] = []
  specie!: Species;
  imageFile: any

  path!: string
  pathName!: string

  constructor(private routerActive: ActivatedRoute,
              private router: Router,
              private animalService: AnimalService,
              private storage: AngularFireStorage) {
    this.animalService.findAllSpecies().subscribe((data) => {
      this.species = data
    })
  }

  ngOnInit() {
    const id = Number(this.routerActive.snapshot.paramMap.get("id"))
    this.formAnimal = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      age: new FormControl(''),
      quantity: new FormControl(''),
      price: new FormControl(''),
      species: new FormGroup({
        id: new FormControl('')
      })
    })
    this.animalService.findAnimal(id).subscribe((data) => {
      this.animal = data
      this.formAnimal.patchValue(data)
    })
  }

  submitAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      if (this.pathName !== this.imageFile.name) {
        this.pathName = this.imageFile.name
        const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(imagePath);
        this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.path = url
            });
          })
        ).subscribe()
      }
    }
  }

  onSubmit() {
    const imagePath = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(imagePath);
    this.storage.upload(imagePath, this.imageFile).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.animal = this.formAnimal.value
          this.animal.image = url
          this.animalService.save(this.animal).subscribe(() => {
            this.router.navigate(['/animal'])
          })
        });
      })
    ).subscribe()
  }

  back() {
    this.router.navigate(['/animal'])
  }
}
