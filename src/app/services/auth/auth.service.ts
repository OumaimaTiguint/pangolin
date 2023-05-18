import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  	providedIn: 'root'
})
export class AuthService {
	private isAuthenticatedSubject: BehaviorSubject<boolean>;
	baseUrl: string = "http://localhost:8000/";

	constructor(private http: HttpClient) {
		this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
	}

	register(name: string, role: string, email: string, password: string) {
		return this.http.post(this.baseUrl + "inscription", {name, role, email, password});
	}

	login(email: string, password: string) {
		return this.http.post(this.baseUrl + "connexion", {email, password})
		.pipe(
			tap((response: any) => {
			  	const isAuthenticated = response.message === "User found";
			  	this.isAuthenticatedSubject.next(isAuthenticated);
			}),
			catchError((error: any) => {
			  	console.log(error);
			  	return throwError(error);
			})
		  );
	}

	logout(): void {
		this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
	}
	
	setAuthenticated(isAuthenticated: boolean): void {
		this.isAuthenticatedSubject.next(isAuthenticated);
	}
	
	isAuthenticated(): Observable<boolean> {
		return this.isAuthenticatedSubject.asObservable();
	}
}
