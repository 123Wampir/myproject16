import { TestBed } from '@angular/core/testing';

import { HttpNoteService } from './http-note.service';

describe('HttpNoteService', () => {
  let service: HttpNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
