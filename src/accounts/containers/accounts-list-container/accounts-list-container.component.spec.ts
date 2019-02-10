import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsListContainerComponent } from './accounts-list-container.component';

describe('AccountsListContainerComponent', () => {
  let component: AccountsListContainerComponent;
  let fixture: ComponentFixture<AccountsListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
