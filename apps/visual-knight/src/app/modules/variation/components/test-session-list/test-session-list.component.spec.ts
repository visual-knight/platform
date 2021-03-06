import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSessionListComponent } from './test-session-list.component';
import { MatTableModule, MatTooltipModule } from '@angular/material';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('TestSessionListComponent', () => {
  let component: TestSessionListComponent;
  let fixture: ComponentFixture<TestSessionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestSessionListComponent],
      imports: [MatTableModule, MatTooltipModule, ApolloTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
