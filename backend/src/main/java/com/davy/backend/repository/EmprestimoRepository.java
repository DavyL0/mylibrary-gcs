package com.davy.backend.repository;

import com.davy.backend.entity.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EmprestimoRepository extends JpaRepository<Emprestimo, Long> {
    @Query("SELECT e FROM Emprestimo e WHERE e.dataDevolucaoEfetiva IS NULL AND e.dataDevolucaoPrevista < :hoje")
    List<Emprestimo> findAtrasados(@Param("hoje") LocalDate hoje);
}
