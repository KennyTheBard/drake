import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/validators/must-match.group-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @ViewChild('ngForm', {static: false}) ngForm!: NgForm;
  form!: FormGroup; 

  constructor(
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group(
      {
        username: [
          null,
          Validators.required
        ],
        password: [
          null,
          [Validators.required, Validators.minLength(8)]
        ],
        retypePassword: [
          null,
          Validators.required
        ],
      }, {
        validator: MustMatch('password', 'retypePassword')
      }
    );
  }

  async registerAccount(form: FormGroup) {
    form.reset();
  } 

}
