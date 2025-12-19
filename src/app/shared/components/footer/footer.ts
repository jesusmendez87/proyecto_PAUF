import { Component } from '@angular/core';
import { HasRoleDirective } from "../../../core/services/role.guard";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

}
