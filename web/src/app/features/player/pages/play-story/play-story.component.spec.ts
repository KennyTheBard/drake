import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayStoryComponent } from './play-story.component';

describe('PlayStoryComponent', () => {
  let component: PlayStoryComponent;
  let fixture: ComponentFixture<PlayStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayStoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
