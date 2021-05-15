import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, ReplaySubject } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ServiceService } from 'src/app/service/service.service';
import Swal from 'sweetalert2';
import {NgxImageCompressService} from 'ngx-image-compress';

@Component({
  selector: 'app-socials',
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.css']
})
export class SocialsComponent implements OnInit {

  showMe: boolean = false;
  public imagePath;
  imgHide: boolean = true;
  imgURL : any;
  public message: string;
  user: any;
  feedDetails = [];
  imgResultBeforeCompress: any;
  imgResultAfterCompress :any=[];
  imagss: any;
  

  constructor(
    private serviceService: ServiceService,
    private toastr: ToastrService,
    private imageCompress: NgxImageCompressService

  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.getFeedDetails();

    

  }


  form = new FormGroup({
    feed: new FormControl('', Validators.required),
    image: new FormControl(''),

  })



  toggleTag() {
    this.showMe = !this.showMe
  }

  // preview(files) {
  //   if (files.length === 0)
  //     return ;
  //     else


  //   var mimeType = files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     return;
  //   }
  //   var reader = new FileReader();
  //   this.imagePath = files;
  //   reader.readAsDataURL(files[0]); 
  //   reader.onload = (_event) => { 
  //     this.imgURL = reader.result; 
  //   }

  // }

  compressFile(event) {
  
    this.imageCompress.uploadFile().then(({image, orientation}) => {
    
  
      this.imageCompress.compressFile(image, orientation, 50, 50).then(

        results => {

          this.imgResultAfterCompress   = results;
         
          console.log('Size in bytes is now:', this.imageCompress.byteCount(results));
      
        }
      );

      
    });
    
  }




  base64Output: string = 'null';

//   onFileSelected(event) {
    
//  console.log(event.target.files[0])
  
//       this.convertFile(event.target.files[0]).subscribe(base64 => {
      
//         this.base64Output = base64;
    
 
//       });
    


//   }

  // convertFile(imgResultAfterCompress: File): Observable<string> {
  //   const result = new ReplaySubject<string>(1);
  //   const reader = new FileReader();
  //   reader.readAsBinaryString(imgResultAfterCompress);
  //   reader.onload = (event) => result.next(btoa(imgResultAfterCompress.toString()));
  //   return result;
  // }

  convertFile(files: File): Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(files);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  onPost() {

    if (this.form.valid) {
      let social = {
        user_name: this.user.name,
        feed: this.form.value.feed,
        image: this.imgResultAfterCompress,
        AuthToken: this.user.token,
      }
   
  
      console.log(social)
      this.serviceService.addPost(social).subscribe(res => {
        this.getFeedDetails();
        this.form.reset();
        Swal.fire(
          'Post has added successfully!',
          '',
          'success'
        )
      })
    } else {

    }

  }


  getFeedDetails() {
    let createToken = {
      AuthToken: this.user.token,
    }
    this.serviceService.getFeedDetails(createToken).subscribe((res: any) => {
      this.feedDetails = res.data;
   
    }

    );
  }

  deletePost(id) {

    this.serviceService.deletePost(id).subscribe((res: any) => {
      this.getFeedDetails();
      Swal.fire(
        'Deleted!',
        'Post deleted.',
        'success'
      )
    });


  }


}
