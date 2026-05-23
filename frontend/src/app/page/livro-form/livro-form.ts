import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LivroService } from '../../service/livro.service';
import { CategoriaService } from '../../service/categoria.service';
import { Categoria } from '../../entity/categoria.model';

@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './livro-form.html',
  styleUrl: './livro-form.css'
})
export class LivroFormComponent implements OnInit {
  livroForm!: FormGroup;
  categorias: Categoria[] = [];
  mensagemSucesso: string = '';
  erroServidor: string = '';

  @Output() cancelado = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private service: LivroService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.livroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      isbn: ['', Validators.required],
      anoPublicacao: [new Date().getFullYear(), [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      status: ['DISPONIVEL']
    });

    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.categoriaService.listarTodas().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Erro ao carregar categorias', err)
    });
  }

  navegarParaLivros(): void {
    this.cancelado.emit();
  }

  onSubmit(): void {
    if (this.livroForm.invalid) {
      return;
    }

    const formValue = this.livroForm.value;
    const livro: any = {
      ...formValue,
      categoria: {
        id: formValue.categoria
      }
    };

    this.service.save(livro).subscribe({
      next: () => {
        this.mensagemSucesso = 'Livro cadastrado com sucesso!';
        this.erroServidor = '';
        setTimeout(() => {
          this.navegarParaLivros();
        }, 2000);
      },
      error: (err) => {
        this.erroServidor = 'Ocorreu um erro ao salvar o livro. Tente novamente.';
        console.error('Erro ao salvar livro', err);
      }
    });
  }
}
