import { Injectable } from '@angular/core';
import { UserDataService } from '../profile/service/user-data-service.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerGuardService implements CanActivate {

  constructor(private userData: UserDataService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userData.isSeller();
  }

}
