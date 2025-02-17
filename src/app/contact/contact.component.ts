import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = 'Santanu Chakrabarty';
  email: string = 'chakrabartys12@gmail.com';
  message: string = '';

  submitForm(event: Event) {
    event.preventDefault();
    console.log('Form Submitted!', {
      name: this.name,
      email: this.email,
      message: this.message
    });
    alert('Thank you for your message! (This is a demo form)');
    this.message = ''; // Reset message after submission
  }
}
