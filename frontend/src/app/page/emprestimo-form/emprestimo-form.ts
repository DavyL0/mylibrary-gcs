import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {EmprestimoService} from '../../service/emprestimo.service';

@Component({
  selector: 'app-emprestimo-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emprestimo-form.html',
  styleUrl: './emprestimo-form.css',
})
export class EmprestimoForm {
  @Output() emprestimoRealizado = new EventEmitter<void>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: EmprestimoService) {
    this.form = this.fb.group({
      livroId: [null, [Validators.required, Validators.min(1)]],
      nomeEmprestimo: ['', Validators.required],
      telefone: ['', Validators.required],
      dataDevolucaoPrevista: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.service.emprestaLivro(this.form.value).subscribe({
        next: () => {
          alert('Empréstimo registrado com sucesso!');
          this.form.reset();
          this.emprestimoRealizado.emit(); // Notifica a listagem para atualizar
        },
        error: (err) => alert('Erro ao registrar empréstimo. Verifique se o ID do livro está correto.')
      });
    }
  }
}
