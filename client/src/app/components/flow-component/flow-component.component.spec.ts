import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowComponentComponent } from './flow-component.component';

describe('FlowComponentComponent', () => {
  let component: FlowComponentComponent;
  let fixture: ComponentFixture<FlowComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlowComponentComponent]
    });
    fixture = TestBed.createComponent(FlowComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
