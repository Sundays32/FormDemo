import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, PatternValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-c',
  templateUrl: './form-c.component.html',
  styleUrls: ['./form-c.component.css']
})
export class FormCComponent {
  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: ['', Validators.required],
      dob: ['', [Validators.required,this.validateDOB]],
      gender: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      address: ['', Validators.required],
      job: ['', Validators.required],
      dept: ['', Validators.required],
      salary: ['', Validators.required],
      doj: ['', [Validators.required,this.validateDateNotInFuture]],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      // Perform actions with valid form data, such as sending to server
      console.log(this.employeeForm.value);
    } else {
      // Mark form fields as touched to display validation messages
      this.markFormGroupTouched(this.employeeForm);
    }
  }

  // Helper function to mark all form fields as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  validateDateNotInFuture(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate > today) {
      return { futureDate: true };
    }

    return null;
  }
  validateDOB(control: AbstractControl): ValidationErrors | null {
    const dob = new Date(control.value);
    const today = new Date();
    var age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age < 18) {
      return { tooYoung: true };
    }

    return null;
  }
}
