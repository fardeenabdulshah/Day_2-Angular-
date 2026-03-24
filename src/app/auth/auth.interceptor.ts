import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthIntercepter implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler){
        return next.handle(req)
    }
}