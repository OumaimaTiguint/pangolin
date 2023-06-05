import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth/auth.service';
import Pangolin, { PangolinFriend, Role } from '../models/pangolin';
import { Observable, Subject, finalize, startWith, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  	selector: 'app-profile',
  	templateUrl: './profile.component.html',
  	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	user: any;
	userId!: string;
	allUsers$: Observable<Pangolin[] | any> | undefined;
	roles: any[] = [
		{value: Role.guerrier, name: 'Guerrier'},
		{value: Role.alchimiste, name: 'Alchimiste'},
		{value: Role.sorcier, name: 'Sorcier'},
		{value: Role.espions, name: 'Espions'},
		{value: Role.enchanteur, name: 'Enchanteur'},
	];
	editing: boolean = false;
	loading: boolean = false;
	private userUpdateSubject = new Subject<void>();

  	constructor(private route: ActivatedRoute,
				private authService: AuthService,
				private router: Router,
				private userService: UserService,
				private dialog: MatDialog)
			{
	}
	
	addToFriends(u: Pangolin) {
		this.user.friends.push({_id: u._id, name: u.name, email: u.email, role: u.role});
		this.updateUser();
	}

	addNewFriend() {
		const dialogRef = this.dialog.open(DialogComponent, { 
			width: '90%',
			maxWidth: '520px',
			data: {userId: this.userId}
		});

		dialogRef.afterClosed().subscribe(result => {
			this.addToFriends(result)
		});
	}

	deleteFriend(friend: PangolinFriend) {
		const index = this.user.friends.findIndex((f:PangolinFriend)=> f._id === friend._id);
		this.user.friends.splice(index, 1);
		this.updateUser();
	}

	updateUser() {
		this.loading = true;
		this.userService.updateUser(this.userId, this.user.role, this.user.friends)
			.subscribe((response:any) => {
				this.editing = false;
				this.userUpdateSubject.next();
			}, (error) => {
				console.log(error)
			}, () => {
				this.loading = false;
			})
	}

	editProfile() {
		this.editing = true;
	}

	logout() {
		this.authService.logout();
		this.router.navigate(["/connexion"]);
	}

	getUsers(id: any) {
		this.loading = true;
		this.allUsers$ = this.userUpdateSubject.pipe(
			startWith(null),
			switchMap(() =>
			  	this.userService.getAllUsers(id).pipe(
					finalize(() => {
				  		this.loading = false;
					})
			  	)
			)
		);
	}

  	ngOnInit(): void {
		this.loading = true;
		this.userId = this.route.snapshot.queryParams['userId'];
		this.userService.getUserById(this.userId)
		  	.pipe(
				finalize(() => {
			  		this.loading = false;
				})
		  	).subscribe((response: any) => {
				this.user = response;
				this.getUsers(this.userId);
		  	}, (error) => {
				console.log(error);
		  	});
	}

}
