import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
    myForm: FormGroup;
    onSubmit(){
        this.myForm.reset();
        console.log(this.myForm);
    }
    ngOnInit(){
        this.myForm = new FormGroup({
            firstName: new FormControl('',Validators.required),
            lastName: new FormControl('',Validators.required),
            email: new FormControl('',[
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl('',Validators.required),
        });
    }
}