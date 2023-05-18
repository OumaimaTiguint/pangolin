import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AuthService } from './services/auth/auth.service';

const routes: Routes = [
	{
		path: 'inscription',
		loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
	},
	{
		path: 'connexion',
		loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
	},
	{
		path: 'profile',
		loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
		canActivate: [AuthGuard]
	}
];

@NgModule({
  	imports: [RouterModule.forRoot(routes)],
  	exports: [RouterModule],
	providers: [AuthGuard, AuthService]
})
export class AppRoutingModule { }
