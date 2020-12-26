import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseStoriesComponent } from './browse-stories.component';

describe('BrowseStoriesComponent', () => {
  let component: BrowseStoriesComponent;
  let fixture: ComponentFixture<BrowseStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseStoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
