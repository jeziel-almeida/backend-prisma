# API Node.js com Prisma e Docker

![GitHub repo size](https://img.shields.io/github/repo-size/jeziel-almeida/backend-prisma?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/jeziel-almeida/backend-prisma?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/jeziel-almeida/backend-prisma?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/bitbucket/issues/jeziel-almeida/backend-prisma?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/bitbucket/pr-raw/jeziel-almeida/backend-prisma?style=for-the-badge)


> API Node.js com Prisma (ORM) e Docker

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Tarefa 1
- [x] Tarefa 2
- [x] Tarefa 3
- [ ] Tarefa 4
- [ ] Tarefa 5

## ☕ Usando backend-prisma

Comandos docker para iniciar o container detached do terminal:

```
docker-compose up -d
```

Comando para iniciar o prisma no projeto:

```
npx prisma init / yarn prisma init
```

Alterar o arquivo .env com a string de conexão do banco de dados:

```
DATABASE_URL="postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public"
```

Criar as migrations:

```
npx prisma migrate dev --name init
```

## 📫 Contribuindo para <nome_do_projeto>

Para contribuir com <nome_do_projeto>, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

