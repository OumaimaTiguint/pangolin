import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  	declarations: [
    	LoginComponent
  	],
  	imports: [
    	CommonModule,
    	ReactiveFormsModule,
    	FormsModule,
		LoginRoutingModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule
  	],
	exports: [
		LoginComponent
	]
})
export class LoginModule { }
