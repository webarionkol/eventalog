import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
 
@Injectable()
export class ReqInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let header = { 'Content-Type': 'application/json'}; 
        let currentUser = JSON.parse(localStorage.getItem('user'));
        
        // add authorization header with jwt token if available
        if (currentUser && currentUser.api_token) {
            header['Authorization'] = `Bearer ${currentUser.api_token}`;
        }
      
        request = request.clone({
            setHeaders: header
        });
        return next.handle(request);    
    }
}
 
export const ReqInterceptorProvider = {
   provide: HTTP_INTERCEPTORS,
   useClass: ReqInterceptor,
   multi: true,
};