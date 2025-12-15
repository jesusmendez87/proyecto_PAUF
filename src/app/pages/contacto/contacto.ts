import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.html'
})
export class Contacto {

  enviar(form: HTMLFormElement) {

    emailjs.init('Tial4wMcE-CujZdA3');

    emailjs.sendForm(
      'default_service',
      'template_ju360sb',
      form
    ).then(() => {
      alert('Correo enviado');
      form.reset();
    }).catch((error) => {
      console.error(error);
      alert('Error al enviar');
    });
  }
}
