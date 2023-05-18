import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  	declarations: [
    	RegisterComponent
  	],
  	imports: [
    	CommonModule,
		RegisterRoutingModule,
		ReactiveFormsModule,
    	FormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule
  	],
	exports: [
		RegisterComponent
	]
})
export class RegisterModule { }
