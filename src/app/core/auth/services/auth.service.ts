import { HttpClient } from '@angular/common/http';
import { inject, Service, WritableSignal, signal } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserDataResponse } from '../../models/sign-up.interface';
import { Router } from '@angular/router';

@Service()
export class AuthService {
    private readonly httpClient = inject(HttpClient)
    private readonly router = inject(Router)

    isLogged:WritableSignal<boolean>=signal<boolean>(false)

    

    signUp(data:Object):Observable<UserDataResponse>{
        return this.httpClient.post<UserDataResponse>(`${environment.baseUrl}/api/v1/auth/signup`,data)
    }
    signIn(data:Object):Observable<UserDataResponse>{
        return this.httpClient.post<UserDataResponse>(`${environment.baseUrl}/api/v1/auth/signin`,data)
    }
    signOut(): void {
  localStorage.removeItem('freshToken');
    localStorage.removeItem('userData');

  this.isLogged.set(false);
  this.router.navigate(['/login'])
}
     forgetPassword(data:Object):Observable<any>{
        return this.httpClient.post<any>(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
    }
     verifyResetCode(data:Object):Observable<any>{
        return this.httpClient.post<any>(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
    }
     resetPassword(data:Object):Observable<any>{
        return this.httpClient.put<any>(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
    }
}
