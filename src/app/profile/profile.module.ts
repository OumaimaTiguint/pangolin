import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  	declarations: [
    	ProfileComponent
  	],
  	imports: [
    	CommonModule,
		ProfileRoutingModule,
		MatCardModule,
		MatFormFieldModule,
		MatAutocompleteModule,
		FormsModule,
		MatListModule,
		MatIconModule,
		MatButtonModule,
		MatSelectModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatInputModule
  	],
	exports: [
		ProfileComponent
	]
})
export class ProfileModule { }
