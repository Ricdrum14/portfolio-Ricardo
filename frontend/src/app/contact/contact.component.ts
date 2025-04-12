import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    user_name: '',
    user_email: '',
    message: ''
  };

  sendEmail(): void {
    emailjs.send(
      'service_8o5m5bn',
      'template_l1t4qxt',
      this.formData,
      'C6pOONfmccbftjOnQ'
    ).then(
      () => {
        alert('Message envoyé avec succès ✅');
        this.formData = { user_name: '', user_email: '', message: '' };
      },
      (error) => {
        console.error('Erreur:', error);
        alert('Échec de l’envoi ❌');
      }
    );
  }
}


