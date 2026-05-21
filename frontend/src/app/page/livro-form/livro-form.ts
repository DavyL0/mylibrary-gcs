import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LivroService } from '../../service/livro.service';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './livro-form.html',
  styleUrl: './livro-form.css'
})
export class LivroFormComponent {
  livroForm: FormGroup;

  constructor(private fb: FormBuilder, private service: LivroService) {
    this.livroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      isbn: ['', Validators.required],
      ano: [2026, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      status: ['DISPONIVEL']
    });
  }

  onSubmit(): void {
    if (this.livroForm.valid) {
      this.service.save(this.livroForm.value).subscribe({
        next: () => {
          alert('Livro cadastrado com sucesso!');
          this.livroForm.reset({ status: 'DISPONIVEL', ano: 2026 });
        },
        error: (err) => console.error('Erro ao salvar livro', err)
      });
    }
  }
}
