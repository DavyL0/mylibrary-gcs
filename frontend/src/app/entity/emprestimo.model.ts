export interface EmprestimoRequest {
  livroId: number;
  nomeEmprestimo: string;
  telefone: string;
  dataDevolucaoPrevista: string;
}

export interface Emprestimo {
  id: number;
  livro?: any;
  livroId?: number;
  nomeEmprestimo: string;
  telefone: string;
  dataEmprestimo: string;
  dataDevolucaoPrevista: string;
  dataDevolucaoEfetiva?: string;
}
