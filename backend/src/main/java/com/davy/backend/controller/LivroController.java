package com.davy.backend.controller;

import com.davy.backend.entity.Livro;
import com.davy.backend.service.LivroService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
public class LivroController {
    private final LivroService service;

    public LivroController(LivroService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<Livro>> findAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Livro> findById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping("/autor/{autor}")
    public ResponseEntity<List<Livro>> findByAutor(@PathVariable String autor) {
        return ResponseEntity.ok(service.findByAutor(autor));
    }

    @GetMapping("/titulo/{titulo}")
    public ResponseEntity<Livro> findByTitulo(@PathVariable String titulo) {
        return ResponseEntity.ok(service.findByTitulo(titulo));
    }

    @PostMapping
    public ResponseEntity<Livro> save(@RequestBody Livro livro) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(livro));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Livro> update(@PathVariable Long id, @RequestBody Livro livro) {
        service.findById(id);
        livro.setId(id);
        return ResponseEntity.ok(service.save(livro));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
