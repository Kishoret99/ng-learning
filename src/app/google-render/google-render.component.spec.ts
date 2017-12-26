import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleRenderComponent } from './google-render.component';

describe('GoogleRenderComponent', () => {
  let component: GoogleRenderComponent;
  let fixture: ComponentFixture<GoogleRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
