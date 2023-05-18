import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth/auth.service';
import Pangolin, { PangolinFriend, Role } from '../models/pangolin';

@Component({
  	selector: 'app-profile',
  	templateUrl: './profile.component.html',
  	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
	user: any;
	userId!: string;
	allUsers: Pangolin[] = [];
	roles: any[] = [
		{value: Role.guerrier, name: 'Guerrier'},
		{value: Role.alchimiste, name: 'Alchimiste'},
		{value: Role.sorcier, name: 'Sorcier'},
		{value: Role.espions, name: 'Espions'},
		{value: Role.enchanteur, name: 'Enchanteur'},
	];
	editing: boolean = false;
	loading: boolean = false;

  	constructor(private route: ActivatedRoute,
				private authService: AuthService,
				private router: Router,
				private userService: UserService) { }
	
	addToFriends(u: Pangolin) {
		this.user.friends.push({_id: u._id, name: u.name, email: u.email, role: u.role});
		this.updateUser();
		this.getUsers(this.userId);
	}

	deleteFriend(friend: PangolinFriend) {
		const index = this.user.friends.findIndex((f:PangolinFriend)=> f._id === friend._id);
		this.user.friends.splice(index, 1);
		this.updateUser();
		this.getUsers(this.userId);
	}

	updateUser() {
		this.loading = true;
		this.userService.updateUser(this.userId, this.user.role, this.user.friends)
			.subscribe((response:any) => {
				console.log(response)
				this.editing = false;
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
		this.userService.getAllUsers(id)
		.subscribe((res: any)=> {
			this.allUsers = res;
		}, (error) => {
			console.log(error);
		}, () => {
			this.loading = false;
		});
	}

  	ngOnInit(): void {
		this.loading = true;
		this.userId = this.route.snapshot.queryParams['userId'];
		this.getUsers(this.userId);
		this.userService.getUserById(this.userId)
			.subscribe((response: any) => {
				this.user = response;
			}, (error) => {
				console.log(error);
			}, () => {
				this.loading = false;
			});
  	}

}
