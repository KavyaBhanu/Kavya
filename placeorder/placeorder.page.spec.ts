import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { PlaceorderPage } from './placeorder.page';

describe('PlaceorderPage', () => {
  let component: PlaceorderPage;
  let fixture: ComponentFixture<PlaceorderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlaceorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
