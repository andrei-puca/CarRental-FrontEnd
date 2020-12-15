import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { OidcSecurityService, OidcSecurityValidation } from "angular-auth-oidc-client";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastrService } from "../toastr/toastr.service";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptor implements HttpInterceptor {
  private oidcSecurityService: OidcSecurityService;

  private oidcSecurityValidation: OidcSecurityValidation;

  public constructor(private readonly injector: Injector, private readonly toastrService: ToastrService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestToForward = req;

    if (this.oidcSecurityService === undefined) {
      this.oidcSecurityService = this.injector.get(OidcSecurityService);
    }

    if (this.oidcSecurityService !== undefined) {
      const token = this.oidcSecurityService.getToken();

      if (token !== "") {
        const tokenValue = `Bearer ${token}`;

        requestToForward = req.clone({
          setHeaders: { Authorization: tokenValue },
        });
      }
    } else {
      console.debug("OidcSecurityService undefined: No auth header!");
    }

    return next.handle(requestToForward).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (this.oidcSecurityValidation === undefined) {
            this.oidcSecurityValidation = this.injector.get(OidcSecurityValidation);
          }

          const token = this.oidcSecurityService.getToken();

          if (token === "" || this.oidcSecurityValidation.isTokenExpired(token)) {
            this.oidcSecurityService.authorize();
          }
        }

        if (error.url.includes("security-token-service")) {
          this.toastrService.error(error.message);
        }

        next.handle(requestToForward);

        return throwError(error);
      })
    );
  }
}
