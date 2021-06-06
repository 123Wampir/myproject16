import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path:"",
    component: MainComponent
  },
  {
    path:"note",
    loadChildren: () => import("./note/note.module").then((mod)=>mod.NoteModule)
  },
  {
    path:"about",
    component:AboutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
