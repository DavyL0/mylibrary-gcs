export interface Livro {
  id?: number;
  titulo: string;
  autor: string;
  isbn: string;
  ano: number;
  categoria: string;
  status: 'DISPONIVEL' | 'EMPRESTADO'; // CA02.1 & CA02.2
}
