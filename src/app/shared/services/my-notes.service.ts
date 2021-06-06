import { Injectable } from '@angular/core';
import { Note, NoteType } from '../note.model';

@Injectable({
  providedIn: 'root'
})
export class MyNotesService {
  notes!: Note[];
  noteType!:NoteType[];

  constructor() { }
}
