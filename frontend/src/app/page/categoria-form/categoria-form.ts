import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-categoria-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: 'categoria-form.html',
  styleUrl: 'categoria-form.css',
})
export class CategoriaForm implements OnInit {
  categoriaForm!: FormGroup;
  mensagemSucesso: string = '';
  erroServidor: string = '';

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

  submeter(): void {
    if (this.categoriaForm.invalid) {
      return;
    }

    this.categoriaService.cadastrarCategoria(this.categoriaForm.value).subscribe({
      next: () => {
        this.mensagemSucesso = 'Categoria cadastrada com sucesso!';
        this.erroServidor = '';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        if (err.status === 409) {
          this.categoriaForm.get('nome')?.setErrors({ nomeDuplicado: true });
        } else {
          this.erroServidor = 'Ocorreu um erro ao salvar a categoria. Tente novamente.';
        }
      }
    });
  }
}
