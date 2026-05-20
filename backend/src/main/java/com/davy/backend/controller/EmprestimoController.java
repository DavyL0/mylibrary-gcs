package com.davy.backend.controller;

import com.davy.backend.entity.Emprestimo;
import com.davy.backend.service.EmprestimoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/emprestimos")
public class EmprestimoController {

    private final EmprestimoService service;

    public EmprestimoController(EmprestimoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Emprestimo>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Emprestimo> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<Emprestimo> emprestaLivro(@RequestBody EmprestimoRequest request) {
        Emprestimo emprestimo = service.emprestaLivro(
                request.livroId(),
                request.nomeEmprestimo(),
                request.telefone(),
                request.dataDevolucaoPrevista()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(emprestimo);
    }

    @PatchMapping("/{id}/devolver")
    public ResponseEntity<Emprestimo> devolverLivro(@PathVariable Long id) {
        return ResponseEntity.ok(service.devolverLivro(id));
    }

    record EmprestimoRequest(
            Long livroId,
            String nomeEmprestimo,
            String telefone,
            LocalDate dataDevolucaoPrevista
    ) {}
}