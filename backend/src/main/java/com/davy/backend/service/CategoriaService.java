package com.davy.backend.service;

import com.davy.backend.entity.Categoria;
import com.davy.backend.repository.CategoriaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

    @Service
    public class CategoriaService {

        private final CategoriaRepository categoriaRepository;

        public CategoriaService(CategoriaRepository categoriaRepository) {
            this.categoriaRepository = categoriaRepository;
        }

        public Categoria findById(Long id) {
            return categoriaRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Categoria não encontrada com o ID: " + id));
        }

        public List<Categoria> findAll() {
            return categoriaRepository.findAll();
        }

        @Transactional
        public Categoria save(Categoria categoria) {
            boolean nomeExiste = categoriaRepository.existsByNome(categoria.getNome());
            if (nomeExiste) {
                throw new IllegalStateException("Já existe uma categoria cadastrada com o nome: " + categoria.getNome());
            }
            return categoriaRepository.save(categoria);
        }

        @Transactional
        public void deleteById(Long id) {
            Categoria categoria = findById(id);
            if (categoria.getLivros() != null && !categoria.getLivros().isEmpty()) {
                throw new IllegalStateException("Não é possível excluir uma categoria que possui livros associados.");
            }
            categoriaRepository.deleteById(id);
        }
}