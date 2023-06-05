import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterModule } from './register/register.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  	declarations: [
    	AppComponent,
     	DialogComponent
  	],
  	imports: [
    	BrowserModule,
    	AppRoutingModule,
		RegisterModule,
		LoginModule,
		ProfileModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatSelectModule,
		MatDialogModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		FormsModule
  	],
  	providers: [
		UserService
	],
  	bootstrap: [AppComponent]
})
export class AppModule { }
