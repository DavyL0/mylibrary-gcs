import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {Categoria} from '../../entity/categoria.model';
import {CategoriaService} from '../../service/categoria.service';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categoria-list.html',
  styleUrl: './categoria-list.css',
})
export class CategoriaList  implements OnInit {
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.categoriaService.listarTodas().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err) => {
        console.error('Erro ao carregar as receitas:', err);
      }
    });
    }

}
