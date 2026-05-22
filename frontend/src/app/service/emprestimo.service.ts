import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprestimo, EmprestimoRequest } from '../entity/emprestimo.model';

@Injectable({
  providedIn: 'root'
})
export class EmprestimoService {
  private readonly API = 'http://localhost:8080/api/emprestimos';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(this.API);
  }

  findById(id: number): Observable<Emprestimo> {
    return this.http.get<Emprestimo>(`${this.API}/${id}`);
  }

  emprestaLivro(request: EmprestimoRequest): Observable<Emprestimo> {
    return this.http.post<Emprestimo>(this.API, request);
  }

  devolverLivro(id: number): Observable<Emprestimo> {
    return this.http.patch<Emprestimo>(`${this.API}/${id}/devolver`, {});
  }

  findAtrasados(): Observable<Emprestimo[]> {
    return this.http.get<Emprestimo[]>(`${this.API}/atrasados`);
  }
}
