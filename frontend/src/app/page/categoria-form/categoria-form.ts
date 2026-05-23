import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'categoria-form.html',
  styleUrl: 'categoria-form.css',
})
export class CategoriaForm implements OnInit {
  categoriaForm!: FormGroup;
  mensagemSucesso: string = '';
  erroServidor: string = '';

  @Output() cancelado = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
    });
  }

  navegarParaDashboard(): void {
    this.cancelado.emit();
  }

  submeter(): void {
    if (this.categoriaForm.invalid) {
      return;
    }

    console.log('Enviando categoria:', this.categoriaForm.value);
    this.categoriaService.cadastrarCategoria(this.categoriaForm.value).subscribe({
      next: (res) => {
        console.log('Categoria cadastrada com sucesso:', res);
        this.mensagemSucesso = 'Categoria cadastrada com sucesso!';
        this.erroServidor = '';
        setTimeout(() => {
          this.cancelado.emit();
        }, 2000);
      },
      error: (err) => {
        console.error('Erro ao salvar categoria:', err);
        if (err.status === 409) {
          this.categoriaForm.get('nome')?.setErrors({ nomeDuplicado: true });
        } else {
          this.erroServidor = 'Ocorreu um erro ao salvar a categoria. Tente novamente.';
        }
      }
    });
  }
}
