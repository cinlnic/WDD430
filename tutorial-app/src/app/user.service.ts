import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService{
   activatedEmiiter = new Subject<boolean>();
}
