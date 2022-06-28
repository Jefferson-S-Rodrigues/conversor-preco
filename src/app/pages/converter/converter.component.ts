import { Component, OnInit } from '@angular/core';
import { Calculated } from 'src/app/models/calculated';
import { PriceConvService } from 'src/app/services/price-conv.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
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

  displayedColumns: string[] = ['product', 'price', 'brl', 'action'];

  onSubmit() {
    this.calculated.push(<Calculated>this.productForm.value);

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
    this.calculated.splice(i, 1);
    this.updateData();
  }

}
