import { Categoria } from './categoria.model';

export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  isbn: string;
  anoPublicacao: number;
  categoria: Categoria;
  status: 'DISPONIVEL' | 'EMPRESTADO';
  emprestimos?: any[]; // Adicionado conforme o exemplo de retorno
}

export enum StatusLivro {
  DISPONIVEL = 'DISPONIVEL',
  EMPRESTADO = 'EMPRESTADO'
}
