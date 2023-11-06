import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DeviceData } from '../../models/device-data.model';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.css'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class EditDeviceComponent {
  public editDeviceForm = this.formBuilder.group({
    name: ['', Validators.required],
    ipAddress: ['', Validators.required],
    location: ['', Validators.required],
  });

  @Input()
  set device(device: DeviceData) {
    this.editDeviceForm.reset();
    this.editDeviceForm.patchValue(device);
  }

  constructor(private formBuilder: FormBuilder) {}

  public onSubmit() {
    console.log(this.editDeviceForm.value);
  }
}
