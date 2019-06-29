import { Component, OnInit } from '@angular/core';
import {Form} from '../form';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  constructor() { }
  model = new Form(null, null, null, null);
  modelKeys = Object.keys(this.model);
  submitted = false;

    onSubmit() {
    /* rubric60 | The send button should create an alert based on the message sent */
    // tslint:disable-next-line: max-line-length
    alert('Thank you for your message: ' + this.model.message + '\r\nwe will be in touch with you soon via the email address you provided: ' + this.model.email);
    this.submitted = true;
    }

  ngOnInit() {
  }

}
