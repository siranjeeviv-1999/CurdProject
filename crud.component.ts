import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ApiService } from '../services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {


  


  displayedColumns: string[] = ['ProductName', 'Category', 'date', 'Freshness','Price', 'Comments','Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dialog : MatDialog,private api : ApiService){

  }
  ngOnInit(): void {
    this.getAllProduct();
  }
  openDialog() {
    this.dialog.open(DialogComponent ,{
      width:'35%'
    }).afterClosed().subscribe(val=>{
      if(val == 'save'){
        this.getAllProduct();
      }
    })
  }
  getAllProduct(){
    this.api.getproduct()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert("Error while fetching the  Recordess");

      }
    })
  }
  Editproduct(row : any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      data:row

    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllProduct();
      }
    })
  }
  deleteproduct(id : number){
    this.api.deleteproduct(id)
    .subscribe({
      next:(res)=>{
        alert("Delete data successfully")
        this.getAllProduct();
      },
      error:(err)=>{
        alert("product while data not updated")
      }
    })
  }
  applyFilter(event : Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }







function applyFilter(event: Event | undefined, Event: { new(type: string, eventInitDict?: EventInit | undefined): Event; prototype: Event; readonly AT_TARGET: number; readonly BUBBLING_PHASE: number; readonly CAPTURING_PHASE: number; readonly NONE: number; }) {
  throw new Error('Function not implemented.');
}
