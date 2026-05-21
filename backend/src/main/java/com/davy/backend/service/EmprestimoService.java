package com.davy.backend.service;

import com.davy.backend.entity.Emprestimo;
import com.davy.backend.entity.Livro;
import com.davy.backend.entity.StatusLivro;
import com.davy.backend.repository.EmprestimoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmprestimoService {

    private final EmprestimoRepository emprestimoRepository;
    private final LivroService livroService;

    public EmprestimoService(EmprestimoRepository emprestimoRepository, LivroService livroService) {
        this.emprestimoRepository = emprestimoRepository;
        this.livroService = livroService;
    }

    public Emprestimo emprestaLivro(Long livroId, String nome, String telefone, LocalDate dataDevolucaoPrevista) {
        Livro livroEmprestado = livroService.findById(livroId);

        if (livroEmprestado.getStatus() == StatusLivro.EMPRESTADO) {
            throw new IllegalStateException("Não é possível emprestar um livro já emprestado.");
        }

        livroEmprestado.setStatus(StatusLivro.EMPRESTADO);
        livroService.save(livroEmprestado);

        Emprestimo emprestimo = new Emprestimo();
        emprestimo.setlivro(livroEmprestado);
        emprestimo.setNomeEmprestimo(nome);
        emprestimo.setTelefone(telefone);
        emprestimo.setDataEmprestimo(LocalDate.now());
        emprestimo.setDataDevolucaoPrevista(dataDevolucaoPrevista);

        return emprestimoRepository.save(emprestimo);
    }

    public Emprestimo devolverLivro(Long emprestimoId) {
        Emprestimo emprestimo = emprestimoRepository.findById(emprestimoId)
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado: id " + emprestimoId));

        if (emprestimo.getDataDevolucaoEfetiva() != null) {
            throw new IllegalStateException("Esse empréstimo já foi encerrado.");
        }

        Livro livro = emprestimo.getlivro();
        livro.setStatus(StatusLivro.DISPONIVEL);
        livroService.save(livro);

        emprestimo.setDataDevolucaoEfetiva(LocalDate.now());
        return emprestimoRepository.save(emprestimo);
    }

    public List<Emprestimo> findAll() {
        return emprestimoRepository.findAll();
    }

    public Emprestimo findById(Long id) {
        return emprestimoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Empréstimo não encontrado: id " + id));
    }
}