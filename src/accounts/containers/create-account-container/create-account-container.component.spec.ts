import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountContainerComponent } from './create-account-container.component';

describe('CreateAccountContainerComponent', () => {
  let component: CreateAccountContainerComponent;
  let fixture: ComponentFixture<CreateAccountContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
