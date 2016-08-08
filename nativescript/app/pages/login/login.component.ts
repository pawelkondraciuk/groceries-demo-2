import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Page} from "ui/page";
import {User} from "../../shared/user/user";
import {UserService} from "../../shared/user/user.service"

@Component({
  selector: "login",
  templateUrl: "./pages/login/login.html",
  styleUrls: ["./pages/login/login.css"],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;
  isAuthenticating = false;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private page: Page) {

    this.user = new User();
    this.user.email = "ngconf@telerik.com";
    this.user.password = "password";
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = this.page.ios ? "res://bg_login.jpg" : "res://bg_login";
  }

  submit() {
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address");
      return;
    }

    this.isAuthenticating = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this._userService.login(this.user)
      .subscribe(
        () => {
          this.isAuthenticating = false;
          this._router.navigate(["/list"]);
        },
        () => {
          alert("Unfortunately we were not able to log you in to the system");
          this.isAuthenticating = false;
        }
      );
  }

  signUp() {
    this._userService.register(this.user)
      .subscribe(
        () => {
          alert("Your account was successfully created.");
          this.isAuthenticating = false;
          this.toggleDisplay();
        },
        () => {
          alert("Unfortunately we were unable to create your account.");
          this.isAuthenticating = false;
        }
      );
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}
