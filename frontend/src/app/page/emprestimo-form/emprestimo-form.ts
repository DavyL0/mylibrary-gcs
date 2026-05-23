import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {EmprestimoService} from '../../service/emprestimo.service';
import {LivroService} from '../../service/livro.service';
import {Livro} from '../../entity/livro.model';

@Component({
  selector: 'app-emprestimo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emprestimo-form.html',
  styleUrl: './emprestimo-form.css',
})
export class EmprestimoForm implements OnInit {
  @Output() emprestimoRealizado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  form: FormGroup;
  livrosDisponiveis: Livro[] = [];
  mensagemSucesso: string = '';
  erroServidor: string = '';

  constructor(
    private fb: FormBuilder,
    private service: EmprestimoService,
    private livroService: LivroService
  ) {
    this.form = this.fb.group({
      livroId: ['', [Validators.required]],
      nomeEmprestimo: ['', Validators.required],
      telefone: ['', [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(13),
        Validators.pattern('^[0-9]*$')
      ]],
      dataDevolucaoPrevista: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregarLivrosDisponiveis();
  }

  carregarLivrosDisponiveis(): void {
    this.livroService.findAll().subscribe({
      next: (dados) => {
        this.livrosDisponiveis = dados.filter(l => l.status === 'DISPONIVEL');
      },
      error: (err) => console.error('Erro ao carregar livros para empréstimo', err)
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.service.emprestaLivro(this.form.value).subscribe({
        next: () => {
          this.mensagemSucesso = 'Empréstimo registrado com sucesso!';
          this.erroServidor = '';
          setTimeout(() => {
            this.form.reset();
            this.emprestimoRealizado.emit();
            this.mensagemSucesso = '';
          }, 2000);
        },
        error: (err) => {
          this.erroServidor = 'Erro ao registrar empréstimo. Verifique os dados.';
          console.error(err);
        }
      });
    }
  }
}
