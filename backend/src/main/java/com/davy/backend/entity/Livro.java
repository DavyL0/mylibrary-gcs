package com.davy.backend.entity;

import jakarta.persistence.*;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.Date;

@Entity
@Table(name = "tb_livro")
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 100, nullable = false)
    private String autor;

    @Column(length = 13, nullable = false)
    @UniqueElements
    private String ISBN;

    @Column(length = 100, nullable = false)
    private Date anoPublicacao;

    @ManyToOne(fetch = FetchType.LAZY)
    private Categoria categoriaId;

    @Column(nullable = false)
    private StatusLivro  status = StatusLivro.DISPONIVEL;

    public Livro() {}

    public Livro(Long id, String title, String autor, String ISBN, Date anoPublicacao, Categoria categoriaId, StatusLivro status) {
        this.id = id;
        this.title = title;
        this.autor = autor;
        this.ISBN = ISBN;
        this.anoPublicacao = anoPublicacao;
        this.categoriaId = categoriaId;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public Date getAnoPublicacao() {
        return anoPublicacao;
    }

    public void setAnoPublicacao(Date anoPublicacao) {
        this.anoPublicacao = anoPublicacao;
    }

    public Categoria getCategoriaId() {
        return categoriaId;
    }

    public void setCategoriaId(Categoria categoriaId) {
        this.categoriaId = categoriaId;
    }

    public StatusLivro getStatus() {
        return status;
    }

    public void setStatus(StatusLivro status) {
        this.status = status;
    }
}
