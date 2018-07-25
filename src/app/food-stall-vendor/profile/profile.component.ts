import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RegistrationService } from '../../signupandlogin-forms/registration.service';
import { RegisteredVendor } from '../../signupandlogin-forms/registrationform';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { environment } from '../../../environments/environment';

const URL = environment.folderURL;
const PROFILE_URL = environment.serverURL;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  profileUrl : string = "//placehold.it/100";
  fileToUpload: File = null;
  vendorId : string;
  registrationDetail : RegisteredVendor;
  fileItem : FileItem ;

  constructor(private _registrationService : RegistrationService,private route: ActivatedRoute, private router: Router,  public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
    this.uploader.onAfterAddingFile = (fileItem) => {
      console.log('***********************');
      console.log(this.uploader.queue.length);
      if(this.uploader.queue.length>0){
        this.fileItem = this.uploader.queue[this.uploader.queue.length-1];
        this.fileItem.file.name=this.vendorId+'.jpg';
      }
      // Wrong way of doing this....!!!
      console.log(this.fileItem);
      console.log('***********************');
    //  this.filePreviewPath  = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file)));
    }
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      console.log(params);
      this.vendorId = params['vendorId'];
      console.log("id is :" + this.vendorId + "---" + params['vendorId']);
      this._registrationService.getProfileDetails(this.vendorId).subscribe(
        (data : any) => {
          this.registrationDetail = data[0];
          if(this.registrationDetail.profileUrl){
            this.profileUrl=this.registrationDetail.profileUrl;
          }
          console.log(JSON.stringify(this.registrationDetail,null,4));
        },
        err => console.log(err)
      );
    });
  }

  upload(){
    console.log(this.fileItem);
    this.fileItem.withCredentials=false;
    if(this.fileItem){
      console.log('hii');
      this.uploader.uploadItem(this.fileItem);
      this.registrationDetail.profileUrl=PROFILE_URL+this.vendorId+'.jpg';
      this._registrationService.uploadProfile(this.registrationDetail).subscribe(
        (data : any) => {
          console.log('**********profile updated************');
          setTimeout(
            window.location.reload(),
            1000);
        },
        err => console.log(err)
      );
    }
  }

  onSubmit(formValue: any){
    // console.log("Form Value = " + JSON.stringify(formValue, null, 4));
    this.registrationDetail.firstName=formValue.firstName;
    this.registrationDetail.lastName=formValue.lastName;
    this.registrationDetail.phone=formValue.phone;
    this.registrationDetail.location=formValue.location;
    // console.log("Form Value = " + JSON.stringify(this.registrationDetail, null, 4));
    this._registrationService.uploadProfile(this.registrationDetail).subscribe(
      (data : any) => {
        console.log('**********profile updated************');
        this.toastr.success('Your profile has been updated.', null, {toastLife: 10000});
      },
      err => console.log(err)
    );
  }

  // uploadFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0);
  //   if(!this.fileToUpload){
  //     console.log('returning');
  //     return;
  //   }
  //   console.log(this.fileToUpload);
  //   this._registrationService.uploadProfile(this.vendorId, this.fileToUpload).subscribe(data => {
  //     // do something, if upload success
  //     }, error => {
  //       console.log(error);
  //     });
  // }
}
