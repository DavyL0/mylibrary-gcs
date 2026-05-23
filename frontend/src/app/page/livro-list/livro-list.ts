import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Livro, StatusLivro} from '../../entity/livro.model';
import {HistoricoEmprestimo} from '../../entity/historico-emprestimo.model';
import {LivroService} from '../../service/livro.service';
import {CategoriaService} from '../../service/categoria.service';

@Component({
  selector: 'app-livro-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './livro-list.html',
  styleUrl: './livro-list.css',
})
export class LivroList implements OnInit {
  livros: Livro[] = [];
  historico: HistoricoEmprestimo[] = [];
  livroSelecionado: Livro | null = null;
  categorias: string[] = [];
  StatusLivro = StatusLivro;

  buscaTermo: string = '';
  categoriaSelecionada: string = '';
  statusSelecionado: string = '';

  constructor(
    private service: LivroService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    console.log('Carregando livros...');
    this.service.findAll().subscribe({
      next: (dados) => {
        console.log('Livros carregados:', dados);
        this.livros = dados;
        this.categorias = [...new Set(dados.map(l => l.categoria?.nome).filter((nome): nome is string => !!nome))];
      },
      error: (err) => console.error('Erro ao carregar livros', err)
    });
  }

  aplicarFiltros(): void {
    this.service.findComFiltros({
      busca: this.buscaTermo,
      categoria: this.categoriaSelecionada,
      status: this.statusSelecionado
    }).subscribe(dados => this.livros = dados);
  }

  excluirLivro(livro: Livro): void {
    if (!livro.id) return;

    // CA02.5 e CA02.6: Dupla validação no Frontend (Bloqueio se emprestado)
    if (livro.status !== 'DISPONIVEL') {
      alert('Ação bloqueada! Apenas livros com status DISPONIVEL podem ser excluídos.'); // CA02.6
      return;
    }

    if (confirm(`Tem certeza que deseja excluir o livro "${livro.titulo}"?`)) {
      this.service.delete(livro.id).subscribe({
        next: () => {
          alert('Livro removido com sucesso.');
          this.aplicarFiltros(); // Atualiza a lista
        },
        error: (err) => alert('Erro ao tentar deletar o livro no servidor.')
      });
    }
  }

  // CA02.7: Carrega o histórico do livro selecionado
  verHistorico(livro: Livro): void {
    if (!livro.id) return;
    this.livroSelecionado = livro;
    this.service.getHistorico(livro.id).subscribe({
      next: (dados) => this.historico = dados,
      error: () => alert('Não foi possível carregar o histórico deste livro.')
    });
  }

}
