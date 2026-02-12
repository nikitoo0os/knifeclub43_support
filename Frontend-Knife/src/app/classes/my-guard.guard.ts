import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { ModalAuthorizationComponent } from '../modal-authorization/modal-authorization.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class MyGuardGuard implements CanActivate, CanActivateChild {
  constructor(private authServ: AuthorizationService, private dialog: MatDialog) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authServ.getAuthorization())
      return true;
    else { 
      this.dialog.open(ModalAuthorizationComponent, {
        // width: '500px',
        // height: '400px'
      });
    }
    return false; 
  }
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
