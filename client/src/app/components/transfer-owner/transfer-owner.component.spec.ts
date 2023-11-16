import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferOwnerComponent } from './transfer-owner.component';

describe('TransferOwnerComponent', () => {
  let component: TransferOwnerComponent;
  let fixture: ComponentFixture<TransferOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferOwnerComponent]
    });
    fixture = TestBed.createComponent(TransferOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
