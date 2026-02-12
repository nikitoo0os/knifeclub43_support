import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { animationDuration } from '../classes/globals';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ModalAuthorizationComponent } from '../modal-authorization/modal-authorization.component';

@Component({
  selector: 'app-main-index-lc',
  templateUrl: './main-index-lc.component.html',
  styleUrls: ['./main-index-lc.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate('0.5s', style({ opacity: '*' }))
      ])
    ])
  ]
})
export class MainIndexLcComponent implements OnInit {

  authServ! : AuthorizationService;

  constructor(private authService: AuthorizationService, private router: Router, private dialog: MatDialog) { this.authServ = authService }
  
  ngOnInit(): void {
    if (localStorage.getItem('access_token') == null) {
        this.router.navigate(['']);
        this.dialog.open(ModalAuthorizationComponent, {
          enterAnimationDuration: animationDuration,
          exitAnimationDuration: animationDuration,
        });
    }
    else {
      this.authService.findToken().subscribe((data) => {
        if (data == null) {
          this.router.navigate(['']);
          this.dialog.open(ModalAuthorizationComponent, {
            enterAnimationDuration: animationDuration,
            exitAnimationDuration: animationDuration,
          });
        }
        else {
          if (data.role == 'Админ') this.authServ.setUserRole(Roles.ADMIN);
          else this.authServ.setUserRole(Roles.TRENER);
        }
      });
    }
  } 
}


enum Roles {
  GUEST,
  TRENER,
  ADMIN
}
