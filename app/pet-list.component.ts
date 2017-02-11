import { Component } from '@angular/core';
import {PetService} from './pet.service'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'foster-pet-list',
  templateUrl: './app/pet-list.component.html',
  styleUrls: ['./app/pet-list.component.css']
})
export class PetListComponent {
  type='';
  Pets=[];
  paramsSubscription;
  constructor(
    private petService: PetService,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(){
    this.paramsSubscription = this.activatedRoute.params
      .subscribe(params => {
        let type = params['type'];
        if(type.toLowerCase() === 'all'){
            type='';
        }
        this.getPets(type);
      })
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

    getPets(type) {
    this.type = type;
    this.petService.get(type)
      .subscribe(pets => {
        this.Pets = pets;
      });
  }
 
   onPetFoster(pet) {
    //  console.log('pet Foster and communicated to pet  List')
      this.petService.delete(pet)
      .subscribe(() => {
        this.getPets(this.type);
      });
  }


    onPetAdopt(pet) {
        //  console.log('pet adoption clicked and communicated to list ')
        this.petService.adopt(pet);
  }

 
 
  
  
}
