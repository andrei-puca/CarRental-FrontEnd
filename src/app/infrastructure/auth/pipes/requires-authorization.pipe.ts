import { Pipe, PipeTransform } from "@angular/core";
import { AuthService } from "../auth.service";
import { RequiresAuthorization } from "../interfaces/require-authorization";

@Pipe({
  name: "requiresAuthorization",
})
export class RequiresAuthorizationPipe implements PipeTransform {
  public constructor(private auth: AuthService) {}

  public transform(value: RequiresAuthorization): any {
    if (value instanceof Array) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value.filter((item: RequiresAuthorization) =>
        item.requiresAuthorization ? this.auth.isAuthorized() : true
      );
    }
    return value.requiresAuthorization ? this.auth.isAuthorized() : true;
  }
}
