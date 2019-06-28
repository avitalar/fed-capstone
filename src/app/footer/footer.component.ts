import { Component, OnInit } from '@angular/core';
import {Form} from '../form';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

model = new Form("","","");
modelKeys = Object.keys(this.model);
sendForm(){
  console.log('success'); 
}
submitted = false;

  onSubmit() {
    this.submitted = true; }


  constructor() { }

  ngOnInit() {
  }

}
