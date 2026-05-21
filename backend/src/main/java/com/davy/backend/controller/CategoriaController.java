package com.davy.backend.controller;

import com.davy.backend.entity.Categoria;
import com.davy.backend.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public List<Categoria> findAll()
    {
        return categoriaService.findAll();
    }

    @PostMapping
    public  Categoria create(@RequestBody Categoria categoria)
    {
        return categoriaService.save(categoria);
    }

    @DeleteMapping
    public void delete(@RequestBody Categoria categoria)
    {
        categoriaService.deleteById(categoria.getId());
    }
}
