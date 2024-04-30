import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { CounterServiceService } from '../counterService/counter-service.service';

@Component({
  selector: 'app-counter-handler',
  standalone: true,
  imports: [],
  templateUrl: './counter-handler.component.html',
  styleUrl: './counter-handler.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterHandlerComponent implements OnInit {

  constructor(
    private counterService: CounterServiceService,
  ) { }

  count = signal(0);

  getNumber() {
    return this.counterService.getNumberFromServer();
  }

  increaseNumber() {
    this.counterService.increaseNumberOnServer()
      .then(res => {
        this.count.set(res)
      })
  }

  decreaseNumber() {
    this.counterService.decreaseNumberOnServer()
      .then(res => {
        this.count.set(res)
      })
  }

  @ViewChild('continuousIncreaseCheck') increaseCheckBox!: ElementRef;
  @ViewChild('continuousDecreaseCheck') decreaseCheckBox!: ElementRef;

  id: number | ReturnType<typeof setInterval> = 0;
  continuousIncrease(e: Event) {
    const isChecked = (<HTMLInputElement>e.target).checked;
    if (isChecked) {
      this.decreaseCheckBox.nativeElement.setAttribute("disabled", "")
      this.id = setInterval(() => {
        this.increaseNumber();
      }, 1000)
    }
    else if (this.id != 0) {
      this.decreaseCheckBox.nativeElement.removeAttribute("disabled")
      console.log("Unchecked!")
      clearInterval(this.id);
      this.id = 0;
    }
  }

  continuousDecrease(e: Event) {
    const isChecked = (<HTMLInputElement>e.target).checked;
    if (isChecked) {
      this.increaseCheckBox.nativeElement.setAttribute("disabled", "")
      console.log("Checked!")
      this.id = setInterval(() => {
        this.decreaseNumber();
      }, 1000)
    }
    else if (this.id != 0) {
      this.increaseCheckBox.nativeElement.removeAttribute("disabled")
      console.log("Unchecked!")
      clearInterval(this.id);
      this.id = 0;
    }
  }


  ngOnInit(): void {
    this.getNumber().then(res => {
      this.count.set(res);
    })
  }
}
