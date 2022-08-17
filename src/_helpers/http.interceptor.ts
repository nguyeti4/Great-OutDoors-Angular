import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "src/app/_services/storage.service";

const TOKEN_HEADER_KEY = 'Authorization';
//intercept() gets HTTPRequest object, change it and forward to HttpHandler object’s handle() method.
// It transforms HTTPRequest object into an Observable<HttpEvents>.

//next: HttpHandler object represents the next interceptor in the chain of interceptors. 
//The final ‘next’ in the chain is the Angular HttpClient.

//HttpRequestInterceptor implements HttpInterceptor. 
//We’re gonna add withCredentials: true to make browser include Bearer token on the Request header (HttpOnly Cookie).

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private token: StorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.token.getUser().accessToken;
    console.log(token);
    if(token!=null){
      req = req.clone({
        withCredentials: true, headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
      });
    }
    return next.handle(req);
  }
}
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
