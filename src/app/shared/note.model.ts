export class Note {
  noteTitle: string;
  noteText: string;
  noteType: number;
  noteCreateTime: string;
  noteCreateDate: string;
  id: number;
  static id = 0;
  constructor(title: string, text: string, type:number) {
    this.noteTitle = title;
    this.noteText = text;
    this.noteType = type;
    let now = new Date();
    this.noteCreateTime = now.toLocaleTimeString();
    this.noteCreateDate = now.toLocaleDateString();
    this.id = 0;
  }
}

export interface NoteType {
  id?:number,
  type:string
}