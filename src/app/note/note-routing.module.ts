import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteItemComponent } from './pages/note-item/note-item.component';
import { NoteListComponent } from './pages/note-list/note-list.component';
import { NoteLayoutComponent } from './shared/components/note-layout/note-layout.component';

const routes: Routes = [
  {
    path:"",
    component: NoteLayoutComponent,
    children:[
      {
        path:"",
        component: NoteListComponent
      },
      {
        path:"item",
        component: NoteItemComponent
      },
      {
        path:"item/:id",
        component: NoteItemComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
