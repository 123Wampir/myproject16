import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Note, NoteType } from 'src/app/shared/note.model';
import { HttpNoteService } from 'src/app/shared/services/http-note.service';
import { MyNotesService } from 'src/app/shared/services/my-notes.service';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {

  id: number | null = null;
  note!: Note;
  noteForm!: FormGroup;

  constructor(
    public MyNotesService: MyNotesService,
    private HttpNoteService: HttpNoteService,
    private fb: FormBuilder,
    private router: Router,
    private ActivatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe(params => {
      this.id = params.id ? +params.id : null;
      this.getType();
      this.getData();
    })
  }
  async getType(){
    try {
      this.MyNotesService.noteType = await this.HttpNoteService.getNoteType();
    } catch (err) {console.error(err);}
  }


  async getData() {

    const controls = {
      noteTitle: [null, [Validators.required, Validators.maxLength(100)]],
      noteText: [null, [Validators.required, Validators.maxLength(1000)]],
      noteType: [null, [Validators.required]],
      newType: [null],
      noteCreateDate: [null],
      noteCreateTime: [null],
    };
    this.noteForm = this.fb.group(controls);
    if (this.id) {
      try {
        this.note = await this.HttpNoteService.getNote(this.id);
      }
      catch (err) { console.log(err) }
      this.noteForm.patchValue(this.note);
    }
    else this.noteForm.reset();
    console.log();
  }
  async onSave() {
    if (this.id) {
      let note = new Note(this.noteForm.value["noteTitle"], this.noteForm.value["noteText"], this.noteForm.value["noteType"]);
      this.noteForm.value["noteCreateDate"] = note.noteCreateDate;
      this.noteForm.value["noteCreateTime"] = note.noteCreateTime;
      try {
        await this.HttpNoteService.putNote(this.id, this.noteForm.value);
        this.getData();
      } catch (err) { console.log(err) };
    }
    else {
      let note = new Note(this.noteForm.value["noteTitle"], this.noteForm.value["noteText"], this.noteForm.value["noteType"]);
      this.noteForm.value["noteCreateDate"] = note.noteCreateDate;
      this.noteForm.value["noteCreateTime"] = note.noteCreateTime;
      try {
        let result = await this.HttpNoteService.postNote(this.noteForm.value);
        this.router.navigate([this.router.url, result.id]);
      } catch (err) { console.log(err) };
      this.clearData();
    }
  }
  async onNoteDelete() {
    if (this.id)
      try {
        await this.HttpNoteService.deleteNote(this.id);
        this.router.navigate(["note"])
      } catch (err) { console.log(err) }
  }

  async onTypeCreate() {
    if (this.noteForm.value["newType"] != "" && this.noteForm.value["newType"] != null) {
      console.log(this.noteForm.value["newType"]);
      let newType: NoteType = { type: this.noteForm.value["newType"] };
      try{
        await this.HttpNoteService.postNoteType(newType);
      }catch(err){console.log(err)}
      finally{
        this.getType();
        this.getData();
      }
    }
  }
  async onTypeDelete() {
    let type =this.noteForm.value["noteType"];
    console.log(type);
    if (type != 1 && type != null) {
      try {
        console.log(this.MyNotesService.notes);
        for (let item of this.MyNotesService.notes)
        {
          if (item.noteType==type)
          {
            console.log(item);
            if(this.MyNotesService.noteType[0].id!=undefined)
              item.noteType=this.MyNotesService.noteType[0].id;      
            await this.HttpNoteService.putNote(item.id,item);
          }
        }
        await this.HttpNoteService.deleteNoteType(type);
      } catch (err) { console.error(err) }
      finally{
        this.getType();
        this.getData();
      }
      }
  }
  clearData() {
    this.noteForm.reset();
  }

}
