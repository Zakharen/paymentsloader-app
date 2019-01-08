import {Component, OnInit, EventEmitter, Output, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileDates} from './models/';

@Component({
  selector: 'app-dates-range',
  templateUrl: './dates-range.component.html',
  styleUrls: ['./dates-range.component.scss']
})
export class DatesRangeComponent implements OnInit, OnDestroy {

  public datesRangeForm: FormGroup;
  @Output() formChanged: EventEmitter<FileDates> = new EventEmitter();

  constructor(
      private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    const self = this;
    self.initForm();
  }

  ngOnDestroy() {
    const self = this;
    self.clear(false);
  }

  public filter() {
    const self = this;
    const result: FileDates = self.datesRangeForm.value;
    self.formChanged.emit(result);
  }

  public clear(getRequest: boolean = true) {
    const self = this;
    self.datesRangeForm.reset();
    if (getRequest) {
      self.formChanged.emit(null);
    }
  }

  private initForm() {
    const self = this;
    self.datesRangeForm = self.formBuilder.group({
      filedatefrom: ['', Validators.required],
      filedateto: ['', Validators.required],
    });
  }
}
