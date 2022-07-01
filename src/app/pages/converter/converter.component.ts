import { Component, OnInit } from '@angular/core';
import { Calculated } from 'src/app/models/calculated';
import { PriceConvService } from 'src/app/services/price-conv.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ConverterComponent implements OnInit {

  usd!: number;
  eur!: number;

  calculated: Calculated[] = [];

  dataSource = new MatTableDataSource(this.calculated);

  productField = new FormControl('', [Validators.required]);
  priceField = new FormControl(0, [Validators.min(0.01), Validators.required]);

  productForm = new FormGroup({
    product: this.productField,
    price: this.priceField,
    urltxt: new FormControl(''),
    annot: new FormControl('')
  });


  constructor(private priceConvService: PriceConvService) { }

  ngOnInit(): void {
    this.priceConvService.getPrices().subscribe(result => {
      this.usd = result.USDBRL.ask;
      this.eur = result.EURBRL.ask;
    });

    let products: any = localStorage.getItem('products');
    let calculated = JSON.parse(products);
    if (!calculated) {
      this.calculated = [];
    } else {
      this.calculated = calculated;
      this.updateData();
    }
  }

  displayedColumns: string[] = ['product', 'price', 'brl', 'expand'];
  columnsToDisplayWithExpand = this.displayedColumns;
  expandedElement!: Calculated | null;

  onSubmit() {
    console.log(this.productForm.value);
    this.calculated.push(<Calculated>this.productForm.value);
    console.log(this.calculated);

    this.updateData();

    this.clearForm();
  }

  clearForm() {
    this.productForm.reset();
  }

  updateData() {
    localStorage.setItem('products', JSON.stringify(this.calculated));
    this.dataSource = new MatTableDataSource(this.calculated);
  }

  removeProd(i: number): void {
    console.log(`${i}: ${this.calculated[i]}`);
    this.calculated.splice(i, 1);
    this.updateData();
  }

}
