import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	errorMessage: string | undefined;
  	pangolin = {
		name: '',
		email: '',
		password: ''
	};
	loginForm: FormGroup;

  	constructor(private authService: AuthService,
				private router: Router,
				private formBuilder: FormBuilder) {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	goToRegister() {
		this.router.navigate(['/inscription']);
	}

	onSubmit() {
		if (this.loginForm.valid) {
			this.authService.login(this.loginForm?.get('email')?.value, this.loginForm?.get('password')?.value)
				.subscribe((response:any) => {
					const userId = response.user._id;
					const navigationExtras: NavigationExtras = {
						queryParams: {
					  		userId: userId
						}
					};
			
					this.router.navigate(['/profile'], navigationExtras);
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
