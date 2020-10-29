import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../_class/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public errorAuth = false;
  public loading = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public get isAdmin(): Boolean {
    if (this.userSubject.value != null) {
      let authorities = this.userSubject.value.authorities
      let res = authorities.find(x => x.authority == "ADMIN")
      return res
    } else {
      return false;
    }
  }
  login(credentials) {
    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username.value + ':' + credentials.password.value)
    } : {});
    this.http.get<any>('/api/login', { headers: headers }).subscribe({
      next: user => {
        user.authdata = window.btoa(credentials.username.value + ':' + credentials.password.value);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.loading = false;
        this.errorAuth = false;
        console.log("Zalogowano");
        this.router.navigateByUrl('/');
        return user;
      },
      error: (err) => {
        console.log("error");
        this.loading = false;
        this.errorAuth = true;
      },
      complete: () => {
      }
    }
    )
  }

  logout() {
    this.http.post('/logout', {}).subscribe({
      next: res => {
        console.log(res);
      },
      error: (err) => {
        console.log("error");
      },
      complete: () => {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
        this.loading = false;
      }
    })
  }

}
