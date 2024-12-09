import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyValueComponent } from './apply-value.component';

describe('ApplyValueComponent', () => {
  let component: ApplyValueComponent;
  let fixture: ComponentFixture<ApplyValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
