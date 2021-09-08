import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { CommonService } from '../common.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {
  userForm: FormGroup;
  submitted: boolean = false;
  listOfUsersSavedbyUser = [];
  formEditCase: boolean = false;
  userIdToEdit: any;
  // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
  constructor(
    private fb: FormBuilder,
    private commonSer: CommonService,
    private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      website: ['']
    })
    this.receiveUserDatatoEdit()
  }

  get userFormControls() {
    return this.userForm.controls;
  }

  receiveUserDatatoEdit() {
    this.commonSer.receiveUserData().subscribe((response: any) => {
      if (response != null) {
        this.formEditCase = true
        this.userIdToEdit = response['id']
        this.userForm.patchValue({
          name: response['name'],
          email: response['email'],
          phone: response['phone'],
          website: response['website']
        })
      }
    })
  }

  submitForm() {
    this.submitted = true;
    if (this.userForm.status == 'VALID') {
      if (this.formEditCase) {
        this.commonSer.updateUserDetails(this.userForm.value, this.userIdToEdit).subscribe((response: any) => {
          if (response) {
            Swal.fire('Success', 'User Details Updated Successfully', 'success')
            this.submitted = false
            this.userForm.reset()
            this.formEditCase = false
            this.router.navigate(['users'])
            this.commonSer.sendUserData(null)
          }
        }, (error) => {
          Swal.fire('Error', error.error.message, 'error')
        })
      }
      else {
        this.commonSer.sendUserData(null)
        this.commonSer.saveUserDetails(this.userForm.value).subscribe((response: any) => {
          if (response) {
            Swal.fire('Success', 'User Added Successfully', 'success')
            this.submitted = false
            this.userForm.reset()
            this.formEditCase = false
          }
        }, (error) => {
          Swal.fire('Error', error.error.message, 'error')
        })
      }
    }
    else {
      return
    }
  }

  backUserList() {
    this.commonSer.sendUserData(null)
    this.router.navigate(['users'])
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
