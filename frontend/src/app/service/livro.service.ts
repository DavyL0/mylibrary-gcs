import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../entity/livro.model';
import { HistoricoEmprestimo } from '../entity/historico-emprestimo.model'

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  private readonly API = '/api/livros';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.API);
  }

  findComFiltros(filtros: { categoria?: string; status?: string; busca?: string }): Observable<Livro[]> {
    let params = new HttpParams();
    if (filtros.categoria) params = params.set('categoria', filtros.categoria);
    if (filtros.status) params = params.set('status', filtros.status);
    if (filtros.busca) params = params.set('busca', filtros.busca); // Para título ou autor

    return this.http.get<Livro[]>(this.API, { params });
  }

  save(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.API, livro);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  getHistorico(id: number): Observable<HistoricoEmprestimo[]> {
    return this.http.get<HistoricoEmprestimo[]>(`${this.API}/${id}/historico`);
  }
}
