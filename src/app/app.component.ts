import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  formProject: FormGroup;
  projectStatus = ["Stable", "Critical", "Finished"];
  ngOnInit() {
    this.formProject = new FormGroup({
      projectname: new FormControl(null, [
        Validators.required,
        this.forbiddenNames.bind(this),
      ]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.forbiddenEmails.bind(this)
      ),
      projectStatus: new FormControl(null),
    });
  }

  onSubmit() {
    console.log(this.formProject.status);
  }
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (control.value === "Test") {
      return {
        nameIsForbidden: true,
      };
    } else {
      return null;
    }
  }
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test") {
          resolve({
            emailForbidden: true,
          });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
