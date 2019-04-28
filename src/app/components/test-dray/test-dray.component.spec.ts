import { DragDropModule } from '@angular/cdk/drag-drop';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestDrayComponent } from './test-dray.component';

describe('TestDrayComponent', () => {
  let component: TestDrayComponent;
  let fixture: ComponentFixture<TestDrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDrayComponent ],
      imports: [
        NoopAnimationsModule,
        DragDropModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
