package com.davy.backend.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "tb_emprestimo")
public class Emprestimo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "livro_id")
    private Livro livro;

    @Column(length = 100, nullable = false)
    private String nomeEmprestimo;

    @Column(nullable = false)
    @Size(min = 12, max = 13)
    private String telefone;

    @Column(nullable = false)
    private LocalDate dataEmprestimo = LocalDate.now() ;

    @Column(nullable = false)
    private LocalDate dataDevolucaoPrevista;

    private LocalDate dataDevolucaoEfetiva;

    public Emprestimo() {
    }

    @JsonCreator
    public Emprestimo(
            @JsonProperty("id") Long id,
            @JsonProperty("livro") Livro livro,
            @JsonProperty("nomeEmprestimo") String nomeEmprestimo,
            @JsonProperty("telefone") String telefone,
            @JsonProperty("dataEmprestimo") LocalDate dataEmprestimo,
            @JsonProperty("dataDevolucaoPrevista") LocalDate dataDevolucaoPrevista,
            @JsonProperty("dataDevolucaoEfetiva") LocalDate dataDevolucaoEfetiva) {
        this.id = id;
        this.livro = livro;
        this.nomeEmprestimo = nomeEmprestimo;
        this.telefone = telefone;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
        this.dataDevolucaoEfetiva = dataDevolucaoEfetiva;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Livro getLivro() {
        return livro;
    }

    public void setLivro(Livro livro) {
        this.livro = livro;
    }

    public String getNomeEmprestimo() {
        return nomeEmprestimo;
    }

    public void setNomeEmprestimo(String nomeEmprestimo) {
        this.nomeEmprestimo = nomeEmprestimo;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public void setDataEmprestimo(LocalDate dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }

    public LocalDate getDataDevolucaoPrevista() {
        return dataDevolucaoPrevista;
    }

    public void setDataDevolucaoPrevista(LocalDate dataDevolucaoPrevista) {
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
    }

    public LocalDate getDataDevolucaoEfetiva() {
        return dataDevolucaoEfetiva;
    }

    public void setDataDevolucaoEfetiva(LocalDate dataDevolucaoEfetiva) {
        this.dataDevolucaoEfetiva = dataDevolucaoEfetiva;
    }
}
