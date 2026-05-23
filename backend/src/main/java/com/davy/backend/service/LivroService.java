package com.davy.backend.service;

import com.davy.backend.entity.Livro;
import com.davy.backend.entity.StatusLivro;
import com.davy.backend.repository.LivroRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LivroService {

    private final LivroRepository repository;

    public LivroService(LivroRepository repository) {
        this.repository = repository;
    }

    public List<Livro> findAll() {
        return repository.findAll();
    }

    public List<Livro> findByAutor(String autor) {
        List<Livro> livros = repository.findByAutor(autor);
        if (livros.isEmpty()) {
            throw new RuntimeException("Esse autor não tem livros cadastrados.");
        }
        return livros;
    }

    public Livro findByTitulo(String titulo) {
        return repository.findByTitulo(titulo)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado: " + titulo));
    }

    public Livro findById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado: id " + id));
    }

    public Livro save(Livro livro) {
        return repository.save(livro);
    }

    public void delete(Long id) {
        Livro livro = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Esse livro não existe."));
        if (livro.getStatus() == StatusLivro.EMPRESTADO) {
            throw new IllegalStateException("Não é possível excluir um livro emprestado.");
        }

        repository.deleteById(id);
    }
}
