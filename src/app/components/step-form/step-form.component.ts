import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IStep } from 'src/app/interfaces/step.interface';

@Component({
  selector: 'app-step-form',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.css']
})
export class StepFormComponent implements OnInit {
  @Input() step: IStep;
  @Output() valueChange = new EventEmitter();
  @Output() deleteStepClicked = new EventEmitter();
  stepForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.stepForm = this.fb.group({
      description: ['', Validators.required],
      command: ['', Validators.required],
      arguments: '',
      retryCount: 0
    });
  }

  ngOnInit() {
    this.stepForm.get('description').setValue(this.step.description);
    this.stepForm.get('command').setValue(this.step.command);
    this.stepForm.get('arguments').setValue(this.step.arguments);
    this.stepForm.get('retryCount').setValue(this.step.retryCount);

    this.stepForm.get('description').valueChanges.subscribe(
      data => {
        this.step.description = data;
        this.valueChange.emit(null);
      }
    );

    this.stepForm.get('command').valueChanges.subscribe(
      data => {
        this.step.command = data;
        this.valueChange.emit(null);
      }
    );

    this.stepForm.get('arguments').valueChanges.subscribe(
      data => {
        this.step.arguments = data;
        this.valueChange.emit(null);
      }
    );

    this.stepForm.get('retryCount').valueChanges.subscribe(
      data => {
        this.step.retryCount = data;
        this.valueChange.emit(null);
      }
    );
  }

  deleteStep() {
    this.deleteStepClicked.emit(null);
  }
}
