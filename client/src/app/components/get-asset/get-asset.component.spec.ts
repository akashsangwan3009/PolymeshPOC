import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAssetComponent } from './get-asset.component';

describe('GetAssetComponent', () => {
  let component: GetAssetComponent;
  let fixture: ComponentFixture<GetAssetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAssetComponent]
    });
    fixture = TestBed.createComponent(GetAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
