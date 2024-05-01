import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CounterServiceService } from '../counterService/counter-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter-handler',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './counter-handler.component.html',
  styleUrl: './counter-handler.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterHandlerComponent implements OnInit {
  counterService = inject(CounterServiceService)

  count = signal(0);
  isAutoIncrement = signal(false);
  isAutoDecrement = signal(false);
  autoInterval?: ReturnType<typeof setInterval>;

  async ngOnInit() {
    await this.updateCounter();
  }

  async updateCounter() {
    const counterValue = await this.counterService.getCounterFromServer();
    this.count.set(counterValue);
  }

  async increaseCounter() {
    await this.counterService.increaseCounterOnServer();
    await this.updateCounter();
  }

  async decreaseCounter() {
    await this.counterService.decreaseCounterOnServer();
    await this.updateCounter();
  }

  autoIncrementChange(e: Event) {
    this.clearUpdateInterval();

    if(this.isAutoIncrement()){
      this.isAutoDecrement.set(false);
      this.createUpdateInterval();
    }
  }

  autoDecrementChange(e: Event) {
    this.clearUpdateInterval();

    if(this.isAutoDecrement()){
      this.isAutoIncrement.set(false);
      this.createUpdateInterval();
    }
  }

  createUpdateInterval() {
    this.autoInterval = setInterval(() => {
      if (this.isAutoIncrement()) {
        this.increaseCounter();
      } else if (this.isAutoDecrement()) {
        this.decreaseCounter();
      }
    }, 1000);
  }

  clearUpdateInterval() {
    clearInterval(this.autoInterval);
  }

}
