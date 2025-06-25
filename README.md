<p align="center">
  <img src="icon/icon.jpg" alt="Killua Zoldyck" width="150"/>
</p>

<h1 align="center"> killua-sticker-api V1</h1>


<h3 align="center">
  Uma API simples, leve e local para hospedar e servir pacotes de figurinhas estáticas para bots de WhatsApp ou sites.
</h3>

---

## 📦 Sobre o projeto

Killua Sticker API é uma biblioteca leve e baseada em JSON que facilita a organização, listagem e consumo de pacotes de figurinhas (stickers), ideal para projetos com bots de WhatsApp ou aplicações web.

As informações dos pacotes são centralizadas no arquivo killua-sticker-api.json, enquanto os arquivos de imagem ficam organizados em pastas estruturadas por categorias e nomes dos pacotes. A API não requer servidor: basta importar o JSON local ou via CDN e consumir os dados como preferir.

🔧 Casos de uso
📲 Bots com Baileys (biblioteca para WhatsApp Web via WebSocket)

🤖 Bots com whatsapp-web.js (emulador de cliente via Chromium)

🌐 Aplicações Web com JavaScript puro ou frameworks como React, Vue, etc.

### Você pode visualizar todos os packs disponíveis aqui:

---

## Importação e uso:

* Clone o killua-sticker-api para dentro de uma pasta no seu projeto para consumir localmente:
* Ou baixe a ultima versão AQUI.

```bash
git clone https://github.com/LeonelMiguins/killua-sticker-api.git
```

### Exemplo de uso em node: (mostra o nome de todos os packs disponiveis no console)

```js
const fs = require('fs');
const path = require('path');

// Caminho absoluto para o JSON
const jsonPath = path.join(__dirname, 'killua-sticker-api.json');

// Função principal
function listarNomesDosPacks() {
  if (!fs.existsSync(jsonPath)) {
    console.error('❌ Arquivo killua-sticker-api.json não encontrado.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(jsonPath));

  console.log(`🔍 Lista de packs disponíveis (${data.length}):\n`);

  data.forEach((pack, index) => {
    console.log(`${index + 1}. ${pack.name} (${pack.code})`);
  });
}

// Executa
listarNomesDosPacks();

```

### 📁 Exemplo do JSON (`killua-sticker-api.json`)

* Todos os packs estão organizados da seguinte forma:

```json
[
  {
    "name": "cats1",
    "code": "cats1",
    "description": "Gatinhos engraçados",
    "cover": "packs/animals/cats1/1.jpg",
    "author": "Leo Miguins",
    "stickers": [
      "packs/animals/cats1/1.jpg",
      "packs/animals/cats1/2.jpg",
      "packs/animals/cats1/3.jpg"
    ]
  }
]
```

* Você pode acessar todas as propriedades do pack com ```name```, ```code```, ```description```, ```cover```, ```author``` e ```stickers``` (array de caminhos).

## 🧾 Estrutura

A estrutura da ```Killua Sticker``` API foi pensada para ser simples, modular e fácil de integrar em qualquer projeto que precise servir ou manipular pacotes de figurinhas. Veja o que cada parte representa:

```
killua-sticker-api/
├── packs/
│   └── [categoria]/[nome_do_pack]/
│       ├── 1.jpg
│       ├── 2.webp
│       └── pack-info.json
├── killua-sticker-api.json
├── lib/
│   └── Funções utilitárias usadas por projetos externos
├── scripts/
│   └── Scripts de configuração/geração
└── README.md
```

✅ Observações
O ```pack-info.json``` dentro de cada pasta de pack é opcional, mas recomendado. Caso não exista, valores padrão são aplicados (nome do pack, descrição vazia, etc).

Os caminhos das imagens no JSON são relativos ao projeto e podem ser usados diretamente com fs.readFile (local) ou convertidos em URLs se o projeto for hospedado (por exemplo, via GitHub Pages ou jsDelivr).

O ```killua-sticker-api.json``` é o coração do projeto — todos os dados do sistema são lidos a partir dele.

---

## 🔧 Scripts auxiliares

A pasta `/scripts` contém utilitários como:

* `generate-json.js`: gera o `killua-sticker-api.json` com base nas pastas e imagens (na raiz do projeto, sobrescrevendo o anterior)


## ✅ Requisitos

* Node.js (apenas para usar o `generate-json.js`)
* FFmpeg obrigatório para converter as figurinhas que estão em outros formatos para `.webp` suportado pelo whatsapp.

---

## 🤝 Contribuindo com Seus Próprios Packs

Você pode ajudar a expandir a Killua Sticker API adicionando seus próprios pacotes de figurinhas! Basta seguir os passos abaixo para manter o padrão da biblioteca:

### 📦 1. Crie a Estrutura do Pack

Dentro da pasta packs/, crie uma subpasta com o nome da categoria (ou use: memes, cute, animals, etc). Dentro dela, crie outra pasta com o nome do seu pack:

```
packs/
└── memes/
    └── br-memes1/
        ├── 1.jpg
        ├── 2.webp
        ├── 3.png
        └── pack-info.json
```

Suporta imagens .jpg, .png, .webp e .gif. WebPs animados também são válidos.

### 📝 2. Crie o pack-info.json

Dentro da pasta do seu pack, adicione um arquivo `pack-info.json` com as informações do pacote:

```json
{
  "name": "Memes Brasileiros 1",
  "description": "Os melhores memes BR da internet.",
  "cover": "1.jpg",
  "author": "Seu Nome ou Nick"
}
```

`name`: Nome amigável do pack.

`description`: Descrição curta do conteúdo.

`cover`: Nome do arquivo de imagem que será usado como capa (geralmente a primeira imagem).

`author`: Seu nome ou nickname (opcional, mas recomendado).

### ⚙️ 3. Gere o JSON Principal

Depois de adicionar seus packs, rode o script para atualizar o `killua-sticker-api.json` com todos os novos dados:

```js
node scripts/generate-json.js
```

Esse comando irá ler todos os packs e gerar o arquivo atualizado automaticamente.


✅ Pronto!
Agora você pode:

Testar localmente

Usar com seu bot (Baileys, whatsapp-web.js, Web, etc)

Fazer um pull request para compartilhar com o mundo!

## 👤 Autor

**Leonel Miguins**

[GitHub](https://github.com/LeonelMiguins) · [LinkedIn](https://www.linkedin.com/in/leonelmiguins)

---

## 📄 Licença

Este projeto é licenciado sob a Licença MIT.

---

<p align="center">
  Feito com ❤️ inspirado por Killua ✨
</p>
