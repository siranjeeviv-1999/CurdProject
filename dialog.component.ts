import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef,MAT_DIALOG_DATA}from '@angular/material/dialog'
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnesessList = ['Brand New', 'Second Hand', 'Refurbished'];
  ProductForm !:FormGroup;
  actionbtn: string = "save";
  constructor(private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private api : ApiService, 
    private dialogRef:MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.ProductForm = this.formBuilder.group({
      ProductName : ['',Validators.required],
      Category : ['',Validators.required],
      Freshnesess : ['',Validators.required],
      Price : ['', Validators.required],
      Comments : ['',Validators.required],
      date : ['',Validators.required]
    });
    if(this.editData){
      this.actionbtn="Update";
      this.ProductForm.controls['ProductName'].setValue(this.editData.ProductName);
      this.ProductForm.controls['Category'].setValue(this.editData.Category);
      this.ProductForm.controls['freshness'].setValue(this.editData.freshness);
      this.ProductForm.controls['Price'].setValue(this.editData.Price);
      this.ProductForm.controls['Comments'].setValue(this.editData.Comments);
      this.ProductForm.controls['date'].setValue(this.editData.date);




    }
    
  }
  addproduct(){
    if(this.editData){
      if(this.ProductForm.valid){
        this.api.postproduct(this.ProductForm.value)
        .subscribe({
          next :(res)=>{
            alert("product added successfully") 
            this.ProductForm.reset();
            this.dialogRef.close('save');
          },
          error:()=>{
            alert("error")
          }
        })
      }else{
        this.updateproduct()
      }
    }}
  updateproduct() {
    
      this.api.putproduct(this.ProductForm.value,this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("product updated successfully");
          this.ProductForm.reset();
          this.dialogRef.close('udate');
        },
        error:(err)=>{
          alert("Error while updating Error")
        }
      })
    }
  }

  


