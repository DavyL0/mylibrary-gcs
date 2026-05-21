package com.davy.backend.repository;

import com.davy.backend.entity.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LivroRepository extends JpaRepository<Livro, Long> {
    List<Livro> findByAutor(String autor);
    Optional<Livro> findByTitulo(String titulo);
}
