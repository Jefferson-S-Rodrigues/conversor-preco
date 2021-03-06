import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ]
})
export class MaterialModule { }
