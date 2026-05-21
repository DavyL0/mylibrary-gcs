export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
  categoria: string;
  status: 'DISPONIVEL' | 'EMPRESTADO';
}

export enum StatusLivro {
  DISPONIVEL = 'DISPONIVEL',
  EMPRESTADO = 'EMPRESTADO'
}
