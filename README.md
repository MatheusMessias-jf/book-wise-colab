# book-wise-colab

# REQUISITOS FUNCIONAIS
- [ ] O usuário deve se autenticar
- [ ] O usuário deve listar todos os livros mais populares
- [ ] O usuario deve receber ver as avaliações mais recentes
- [ ] O usuário pode acessar as suas informações ou de outras pessoas
    - [ ] O usuario pode listar todos os livros que ele ja avaliou
    - [ ] O usuario pode ver suas metricas
- [ ] O usuario pode buscar por um livro pelo titulo ou autor
- [ ] O usuario pode listar todos os livros ou filtrar pela categoria
- [ ] O usuario pode ver os detalhes de um livro
- [ ] O usuario pode avaliar um livro
- [ ] O usuario pode fazer logout
- [x] O usuario pode cadastrar um novo livro

# REGRAS DE NEGÓCIO
- [ ] Se ele estiver autenticado ele deverá ver sua ultima leitura na tela de inicio
- [ ] O usuario so pode avaliar um livro se ele estiver autenticado
- [ ] Caso o usuario não estiver logado ele não pode acessar o seu perfil
- [ ] So é possivel cadastrar um novo livro se estiver logado
- [ ] Ao digitar os dados do livro deverá aparecer alguns possiveis livros que ele esta cadastrando

# REQUISITOS NÃO FUNCIONAIS
- [ ] As capas dos livros deverá ser salva na amazom s3
- [ ] A autenticação do usuario deve ser pelo google ou pelo github