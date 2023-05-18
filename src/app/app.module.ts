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

@NgModule({
  	declarations: [
    	AppComponent
  	],
  	imports: [
    	BrowserModule,
    	AppRoutingModule,
		RegisterModule,
		LoginModule,
		ProfileModule,
		HttpClientModule,
		BrowserAnimationsModule
  	],
  	providers: [
		UserService
	],
  	bootstrap: [AppComponent]
})
export class AppModule { }
