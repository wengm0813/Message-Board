import {NgModule} from "@angular/core";
import {SigninComponent} from "./signin.component";
import {SignupComponent} from "./signup.component";
import {LogoutComponent} from "./logout.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./auth.service";
import {CommonModule} from "@angular/common";
import {authRouting} from "./auth.routing";

@NgModule({
    declarations:[
        LogoutComponent,
        SigninComponent,
        SignupComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        authRouting
    ],
    providers: [AuthService]
})
export class AuthModule{

}