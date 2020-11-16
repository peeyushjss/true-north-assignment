import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { AppService } from './app.service';
import { App } from './app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'true-north-assignment';
  displayedColumns = ['Name', 'Email', 'City', 'DOB', 'Phone'];

  dataSource: MatTableDataSource<App>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private appService: AppService,
    private datePipe: DatePipe
  ) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {

    let myData: any[] = [],
      displayData: any[] = [];

    this.appService.getData().subscribe((data: any[]) => {
      myData = data;

      for (let i = 0; i < data['results'].length; i++) {
        let results = data['results'],
          eachResult = results[i];
        displayData.push({
          'Name': eachResult.name.first + " " + eachResult.name.last,
          'Phone': eachResult.phone,
          'Email': eachResult.email,
          'City': eachResult.location.city,
          'DOB': this.datePipe.transform(eachResult.dob.date, 'yyyy-MM-dd')
        });
      }

      this.dataSource = new MatTableDataSource(displayData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

  }


}