import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopularCatogereisComponent } from './popular-catogereis.component';

describe('PopularCatogereisComponent', () => {
  let component: PopularCatogereisComponent;
  let fixture: ComponentFixture<PopularCatogereisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularCatogereisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularCatogereisComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
