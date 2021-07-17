import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { DialogComponent } from '../../../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public isDialogOpen: Boolean = false;

  constructor(public dialog: MatDialog) {}

  openDialog(data: any): Observable<any> {
    if (this.isDialogOpen) {
      this.isDialogOpen = false;
    }
    this.isDialogOpen = true;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: data,
    });

    return dialogRef.afterClosed();
  }
}
