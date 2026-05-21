import { Component, signal } from '@angular/core';
import {LivroList} from './page/livro-list/livro-list';

@Component({
  selector: 'app-root',
  imports: [LivroList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
