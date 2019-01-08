import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() public status = false;

  public mode = 'indeterminate';
  public value = 50;
  public bufferValue = 75;
  private color = 'primary';

  public set barColor(color: string) {
    this.color = color;
  }

  public get barColor() {
    return this.color;
  }

  public get barStatus() {
    return this.status;
  }

  private interval = 1500;

  constructor() { }

  ngOnInit() {
    // TODO: open to interval color change
    // setInterval(() => this.updateBarColor(), this.interval);
  }

  private updateBarColor() {
    switch (this.barColor) {
      case 'primary':
        this.barColor = 'accent';
        break;
      case 'accent':
        this.barColor = 'warn';
        break;
      case 'warn':
        this.barColor = 'primary';
        break;
    }
  }

}
