import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from './app.service';
import { App } from './app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'true-north-assignment';

  displayedColumns = ['name', 'email', 'location', 'dob', 'phone'];

  dataSource: MatTableDataSource<App>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private appService: AppService) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {

    let myData: any[] = [];

    this.appService.getData().subscribe((data: any[]) => {
      myData = data;
      console.log(myData['results']);
      this.dataSource = new MatTableDataSource(myData['results']);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

  }


}