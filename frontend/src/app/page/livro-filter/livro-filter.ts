import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { LivroService } from '../../service/livro.service';
import { Livro, StatusLivro } from '../../entity/livro.model';

@Component({
  selector: 'app-livro-filter',
  templateUrl: './livro-filter.html',
  imports: [ReactiveFormsModule],
  styleUrl: './livro-filter.css'
})
export class LivroFilter implements OnInit, OnDestroy {

  filterForm: FormGroup;
  livros: Livro[] = [];
  livrosFiltrados: Livro[] = [];
  categorias: string[] = [];
  StatusLivro = StatusLivro;

  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private livroService: LivroService) {
    this.filterForm = this.fb.group({
      categoria: [''],
      status: [''],
      busca: ['']
    });
  }

  ngOnInit(): void {
    this.livroService.findAll().subscribe(livros => {
      this.livros = livros;
      this.livrosFiltrados = livros;
      this.categorias = [...new Set(livros.map(l => l.categoria).filter(Boolean))];
    });

    this.filterForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => this.aplicarFiltros());
  }

  aplicarFiltros(): void {
    const { categoria, status, busca } = this.filterForm.value;
    const q = busca?.toLowerCase().trim() ?? '';

    this.livrosFiltrados = this.livros.filter(livro => {
      const matchCategoria = !categoria || livro.categoria === categoria;
      const matchStatus    = !status    || livro.status === status;
      const matchBusca     = !q
        || livro.titulo.toLowerCase().includes(q)
        || livro.autor.toLowerCase().includes(q);

      return matchCategoria && matchStatus && matchBusca;
    });
  }

  get filtrosAtivos(): { label: string; campo: string }[] {
    const { categoria, status, busca } = this.filterForm.value;
    const ativos = [];
    if (categoria) ativos.push({ label: categoria,                    campo: 'categoria' });
    if (status)    ativos.push({ label: status,                       campo: 'status'    });
    if (busca)     ativos.push({ label: `"${busca}"`,                 campo: 'busca'     });
    return ativos;
  }

  removerFiltro(campo: string): void {
    this.filterForm.patchValue({ [campo]: '' });
  }

  limparFiltros(): void {
    this.filterForm.reset({ categoria: '', status: '', busca: '' });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
