# Teste tecnico desenvolvimento web

## Pré-requisitos

- Node.js v18.16.1>
- Docker

## Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
cd nome-do-projeto
```

## Instale as dependências:

Execute o seguinte comando para instalar as dependências do projeto:

```bash
npm install
```

## Configuração do arquivo .env:

Crie um arquivo .env na raiz do projeto e adicione sua chave de API:

```
GEMINI_API_KEY=your_gemini_api_key
```

## Executando a Aplicação

Para subir a aplicação, utilize o Docker Compose:

```bash
docker compose -f docker-compose.yml up
```
