import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { APPROUTES } from "app/app.routes.strings";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class AuthGuardService implements CanActivate {
  public constructor(private oidcSecurityService: OidcSecurityService, private router: Router) {}

  public canActivate(): Observable<boolean> {
    return this.oidcSecurityService.getIsAuthorized().pipe(
      map((isAuthorized: boolean) => {
        if (isAuthorized) {
          return true;
        }

        this.router.navigate([APPROUTES.unauthorized]);

        return false;
      })
    );
  }
}
