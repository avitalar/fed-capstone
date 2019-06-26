import { Component, OnInit } from '@angular/core';
import {Form} from '../form';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

model = new Form(1, 'name', 'email', 'message');

submitted = false;

onSubmit(event: Event) {
  event.preventDefault();
  this.submitted = true; }
  constructor() { }

  ngOnInit() {
  }

}
