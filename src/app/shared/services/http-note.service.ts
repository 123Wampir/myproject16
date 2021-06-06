import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note,NoteType } from '../note.model';

@Injectable({
  providedIn: 'root'
})
export class HttpNoteService {


  noteSource="http://localhost:3000/notes";
  noteTypeSource="http://localhost:3000/types"
  constructor(private http:HttpClient) { }


  getNotes() : Promise<any>{
    return this.http.get(this.noteSource).toPromise();
  }
  getNote(id:number) : Promise<any>{
    return this.http.get(`${this.noteSource}/${id}`).toPromise();
  }
  postNote(data:Note){
    return this.http.post<Note>(this.noteSource,data).toPromise();
  }
  putNote(id:number, data:Note){
    return this.http.put<Note>(`${this.noteSource}/${id}`,data).toPromise();
  }
  deleteNote(id:number){
    return this.http.delete(`${this.noteSource}/${id}/`).toPromise();
  }

  getNoteType() : Promise<any>{
    return this.http.get(this.noteTypeSource).toPromise();
  }
  postNoteType(data:NoteType){
    return this.http.post<NoteType>(this.noteTypeSource,data).toPromise();
  }
  putNoteType(id:number, data:NoteType){
    return this.http.put<NoteType>(`${this.noteTypeSource}/${id}`,data).toPromise();
  }
  deleteNoteType(id:number){
    return this.http.delete(`${this.noteTypeSource}/${id}/`).toPromise();
  }
}
