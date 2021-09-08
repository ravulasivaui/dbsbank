import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-listofusers',
  templateUrl: './listofusers.component.html',
  styleUrls: ['./listofusers.component.css']
})
export class ListofusersComponent implements OnInit {
  usersList: any = [];
  faTrash = faTrash;

  constructor(private commonSer: CommonService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUsersList()
  }

  getUsersList() {
    this.commonSer.getUsers().subscribe((response: any) => {
      if(response){
        this.usersList = response
      }
    })
  }

  editUser(user: any) {
    this.commonSer.sendUserData(user)
    this.router.navigate(['userform'])
  }

  deleteUser(uID: any) {
    this.commonSer.deleteUser(uID).subscribe((response: any) => {
      if(response){
      Swal.fire('Success', 'User Deleted Successfully', 'success')
      }
    }, (error) => {
      Swal.fire('Error', error.error.message, 'error')
    })
  }
}
