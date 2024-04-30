import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterHandlerComponent } from './counter-handler.component';

describe('CounterHandlerComponent', () => {
  let component: CounterHandlerComponent;
  let fixture: ComponentFixture<CounterHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterHandlerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
