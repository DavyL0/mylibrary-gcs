import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Categoria } from '../../entity/categoria.model';
import { CategoriaService } from '../../service/categoria.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './categoria-list.html',
  styleUrl: './categoria-list.css',
})
export class CategoriaList implements OnInit {
  categorias: Categoria[] = [];

  @Output() cancelado = new EventEmitter<void>();

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    console.log('Carregando categorias...');
    this.categoriaService.listarTodas().subscribe({
      next: (data) => {
        console.log('Categorias carregadas:', data);
        this.categorias = data;
      },
      error: (err) => {
        console.error('Erro ao carregar as categorias:', err);
      }
    });
  }

}
