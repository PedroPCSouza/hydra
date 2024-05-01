[![en](https://img.shields.io/badge/lang-en-red.svg)](./README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](./README.pt-br.md)

# Hydra

<a href="https://discord.gg/hydralauncher" target="_blank">![Discord](https://img.shields.io/discord/1220692017311645737?style=flat&logo=discord&label=Hydra&labelColor=%231c1c1c)</a>
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/hydralauncher/hydra/build.yml)
![GitHub package.json version](https://img.shields.io/github/package-json/v/hydralauncher/hydra)

Hydra é um inicializador de jogos com seu próprio cliente bittorrent integrado e um scraper de repack autogerenciado.
O inicializador é escrito em TypeScript (Electron) e Python, que lida com o sistema de torrents usando [libtorrent](https://www.libtorrent.org/).

![Catálogo Hydra](./docs/screenshot.png)

## Instalação

### Instale o Node.js

Certifique-se de ter o Node.js instalado em sua máquina. Caso contrário, baixe e instale-o em [nodejs.org](https://nodejs.org/).

### Instale o Yarn

Yarn é um gerenciador de pacotes para o Node.js. Se você ainda não instalou o Yarn, você pode fazê-lo seguindo as instruções em [yarnpkg.com](https://classic.yarnpkg.com/lang/en/docs/install/) (em Inglês).

### Clone o repositório

```bash
git clone https://github.com/hydralauncher/hydra.git
```

### Instale as Dependências do Node

Navegue até o diretório do projeto e instale as dependências do Node usando o Yarn:

```bash
cd hydra
yarn
```

### Instale o Python 3.9

Certifique-se de ter o Python instalado em sua máquina. Você pode baixá-lo e instalá-lo em [python.org](https://www.python.org/downloads/release/python-3919/).

### Instalar as Dependências do Python

Instale as dependências necessárias do Python usando o pip:

```bash
pip install -r requirements.txt
```

## Variáveis de ambiente

Você precisará de uma chave de API do SteamGridGB para buscar os ícones de jogo na instalação.
Se você deseja ter o onlinefix como repacker, você precisará adicionar suas credenciais no .env

Depois de obtê-lo, você pode colar o arquivo `.env.example` e preencher os campos `STEAMGRIDDB_API_KEY`, `ONLINEFIX_USERNAME`, `ONLINEFIX_PASSWORD`.

## Executando

Depois de configurar tudo, você pode executar o seguinte comando para iniciar o processo Electron e o cliente bittorrent:

```bash
yarn start
```

## Compilação

### Construa o cliente bittorrent

Construa o cliente bittorrent usando este comando:

```bash
python torrent-client/setup.py build
```

### Construa a aplicação Electron

Construa a aplicação Electron usando este comando:

```bash
yarn make
```

## Contribuidores

<!-- readme: contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/hydralauncher">
            <img src="https://avatars.githubusercontent.com/u/164102380?v=4" width="100;" alt="hydralauncher"/>
            <br />
            <sub><b>Hydra</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/zamitto">
            <img src="https://avatars.githubusercontent.com/u/167933696?v=4" width="100;" alt="zamitto"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/fzanutto">
            <img src="https://avatars.githubusercontent.com/u/15229294?v=4" width="100;" alt="fzanutto"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/JackEnx">
            <img src="https://avatars.githubusercontent.com/u/167036558?v=4" width="100;" alt="JackEnx"/>
            <br />
            <sub><b>Null</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/fhilipecrash">
            <img src="https://avatars.githubusercontent.com/u/36455575?v=4" width="100;" alt="fhilipecrash"/>
            <br />
            <sub><b>Fhilipe Coelho</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Magrid0">
            <img src="https://avatars.githubusercontent.com/u/73496008?v=4" width="100;" alt="Magrid0"/>
            <br />
            <sub><b>Magrid</b></sub>
        </a>
    </td></tr>
<tr>
    <td align="center">
        <a href="https://github.com/ferivoq">
            <img src="https://avatars.githubusercontent.com/u/36544651?v=4" width="100;" alt="ferivoq"/>
            <br />
            <sub><b>FeriVOQ</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/xbozo">
            <img src="https://avatars.githubusercontent.com/u/119091492?v=4" width="100;" alt="xbozo"/>
            <br />
            <sub><b>Guilherme Viana</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/pmenta">
            <img src="https://avatars.githubusercontent.com/u/71457671?v=4" width="100;" alt="pmenta"/>
            <br />
            <sub><b>João Martins</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/eltociear">
            <img src="https://avatars.githubusercontent.com/u/22633385?v=4" width="100;" alt="eltociear"/>
            <br />
            <sub><b>Ikko Eltociear Ashimine</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Netflixyapp">
            <img src="https://avatars.githubusercontent.com/u/91623880?v=4" width="100;" alt="Netflixyapp"/>
            <br />
            <sub><b>Netflixy</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: contributors -end -->

## Licença

Hydra é licenciada sob a [Licença MIT](LICENSE).
