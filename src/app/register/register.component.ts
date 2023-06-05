import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Role } from '../models/pangolin';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  	selector: 'app-register',
  	templateUrl: './register.component.html',
  	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	errorMessage: string | undefined;
	isLoggedIn: boolean = false;
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
	@Input() userId: string | undefined;
	@Output() newItemEvent = new EventEmitter<string>();

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
					if(!this.userId) {
						const userId = response.user._id;
						const navigationExtras: NavigationExtras = {
							queryParams: {
								  userId: userId
							}
						};
				
						this.router.navigate(['/profile'], navigationExtras);
					} else {
						console.log(response);
						this.newItemEvent.emit(response);
					}
					
					}, error => {
						console.log({ error });
					});
			
		} else {
			this.errorMessage = "Veuillez remplir tous les champs requis correctement.";
		} 
		
	}

  	ngOnInit(): void {
		this.authervice.isAuthenticated().subscribe(res => this.isLoggedIn = res);
  	}

}
