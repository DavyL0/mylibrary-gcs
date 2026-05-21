# Changelog
## [1.0.0] - 2026-05-20

### Added
- RF01: CRUD Categorias com validação de exclusão (#1)
- RF02: CRUD Livros com filtros e status (#2)
- RF03: Sistema de empréstimos (emprestar/devolver) (#3)
- Pipeline CI: build backend (Maven) e frontend (Angular)
- Status automático: DISPONIVEL ↔ EMPRESTADO
### Technical
- 3 Entidades: Categoria, Livro, Emprestimo
- Service Layer com lógica emprestar/devolver
- Branch protection configurado no main
