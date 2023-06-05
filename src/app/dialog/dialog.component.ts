import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  	constructor(public dialogRef: MatDialogRef<DialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any) {
  	}

	newUserId(event: any) {
		this.dialogRef.close(event.user);
	}

  	ngOnInit(): void {
  	}

}
