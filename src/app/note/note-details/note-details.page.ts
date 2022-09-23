import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.page.html',
  styleUrls: ['./note-details.page.scss'],
})
export class NoteDetailsPage implements OnInit {

  noteForm: FormGroup;
  pinned = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noteService: NotesService) { }

  ngOnInit() {
    this.noteForm = new FormGroup({
      title: new FormControl(),
      content: new FormControl('', Validators.required)
    });
    const formId = this.route.snapshot.paramMap.get('id');
    this.noteService.getNote(formId);
  }

  updateNote() {
    const title = this.noteForm.get('title');
    const content = this.noteForm.get('content');

    if (title.touched || content.touched) {
      this.noteService.updateNote(title.value, content.value);
      this.router.navigateByUrl('tabs/note');
    } else {
      this.router.navigateByUrl('tabs/note');
    }
  }

  pinNote() {
    this.pinned = !this.pinned;
    this.noteService.pinNote(this.pinned);
  }

  deleteNote() {
    this.noteService.deleteNote();
    this.router.navigateByUrl('tabs/note');
  }

}
