import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with showPaypalContent and showCreditCardContent set to false', () => {
    expect(component.showPaypalContent).toBe(false);
    expect(component.showCreditCardContent).toBe(false);
  });

  it('should set showPaypalContent to true and showCreditCardContent to false when onPaypal is called', () => {
    component.onPaypal();
    expect(component.showPaypalContent).toBe(true);
    expect(component.showCreditCardContent).toBe(false);
  });

  it('should set showCreditCardContent to true and showPaypalContent to false when onCreditCard is called', () => {
    component.onCreditCard();
    expect(component.showCreditCardContent).toBe(true);
    expect(component.showPaypalContent).toBe(false);
  });

  it('should have email, nCard, and expiredDate form controls with validators', () => {
    expect(component.email instanceof FormControl).toBe(true);
    expect(component.nCard instanceof FormControl).toBe(true);
    expect(component.expiredDate instanceof FormControl).toBe(true);
    expect(component.email.validator).toEqual(Validators.required);
    expect(component.nCard.validator).toEqual(Validators.required);
    expect(component.expiredDate.validator).toEqual(Validators.required);
  });
});
