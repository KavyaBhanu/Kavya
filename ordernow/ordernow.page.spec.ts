import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdernowPage } from './ordernow.page';

describe('OrdernowPage', () => {
  let component: OrdernowPage;
  let fixture: ComponentFixture<OrdernowPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrdernowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
