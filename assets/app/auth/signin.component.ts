import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent {
    myForm: FormGroup;

    onSubmit() {
        this.myForm.reset();
        console.log(this.myForm);
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new FormControl('', Validators.required),
        });
    }
}