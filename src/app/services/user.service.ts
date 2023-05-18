import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  	providedIn: 'root'
})
export class UserService {
	baseUrl: string = "http://localhost:8000/";
  	constructor(private http: HttpClient) {}

	getAllUsers(id: string) {
		return this.http.get(this.baseUrl + "allUsers/" + id);
	}

	getUserById(id: string) {
		return this.http.get(this.baseUrl + "user/" + id);
	}

	updateUser(id: string, role: string, friends:any[]) {
		return this.http.post(this.baseUrl + "update/" + id, {role, friends});
	}
}
