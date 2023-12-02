# Livrum - Docker


## 0. Requisitos

Nesse ponto, admito que você já instalou o Docker.

Em caso negativo: https://docs.docker.com/get-docker/

---

## 1. Build

A primeira vez e toda vez que dependências mudarem, é necessário *buildar* o aplicativo.

O comando deve ser executado dentro da pasta `app` do projeto: `phase_4/app`

Para *buildar*: `docker compose up -d --build`

- `-d` serve para que a saída dos programas rodando não apareça no terminal
- `--build` serve para *buildar*, dããã


Depois que você rodar com o `--build` a primeira vez, pode rodar direto.

`docker compose up -d`

---

## Portas

Usando o sistema, cada parte tem uma porta específica de execução.

- A porta **80** é o *front*
- A porta **3000** é a *api*
- A porta **3306** é o banco
- A porta **4000** é o *storybook*