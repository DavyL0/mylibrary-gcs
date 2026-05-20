package com.davy.backend.entity;

import jakarta.persistence.*;
import org.hibernate.validator.constraints.UniqueElements;

@Entity
@Table(name = "tb_categoria")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    @UniqueElements
    private String nome;

    @Column(length = 100, nullable = false)
    private String descricao;

    @OneToMany(mappedBy = "categoria")
    private List<Livro> livros;

    public Categoria(Long id, String nome, String descricao, List<Livro> livros) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.livros = livros;
    }

    public Categoria() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public List<Livro> getLivros() {
        return livros;
    }

    public void setLivros(List<Livro> livros) {
        this.livros = livros;
    }
}
