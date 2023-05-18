import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Role } from '../models/pangolin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  	selector: 'app-register',
  	templateUrl: './register.component.html',
  	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	errorMessage: string | undefined;
	roles: any[] = [
		{value: Role.guerrier, name: 'Guerrier'},
		{value: Role.alchimiste, name: 'Alchimiste'},
		{value: Role.sorcier, name: 'Sorcier'},
		{value: Role.espions, name: 'Espions'},
		{value: Role.enchanteur, name: 'Enchanteur'},
	];
	pangolin = {
		name: '',
		role: '',
		email: '',
		password: ''
	};
	signupForm: FormGroup;

  	constructor(private authervice: AuthService,
				private router: Router,
				private formBuilder: FormBuilder) {
		this.signupForm = this.formBuilder.group({
			name: ['', Validators.required],
			role: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	goToLogin() {
		this.router.navigate(['/connexion']);
	}

	onSubmit() {
		if (this.signupForm.valid) {
			this.authervice.register(this.signupForm?.get('name')?.value, this.signupForm?.get('role')?.value, this.signupForm?.get('email')?.value, this.signupForm?.get('password')?.value)
				.subscribe((response:any) => {
					this.goToLogin();
				}, error => {
					console.log({ error });
				});
		} else {
			this.errorMessage = "Veuillez remplir tous les champs requis correctement.";
		} 
		
	}

  	ngOnInit(): void {
  	}

}
