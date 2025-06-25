const fs = require('fs');
const path = require('path');

const packsRoot = path.join(__dirname, '../packs');
const outputFile = path.join(__dirname, '../killua-sticker-api.json');

function isImageFile(file) {
  return /\.(webp|png|jpg|jpeg|gif)$/i.test(file);
}

function getAllPacks() {
  if (!fs.existsSync(packsRoot)) {
    console.error('❌ Pasta "packs" não encontrada!');
    return [];
  }

  const genres = fs.readdirSync(packsRoot).filter(folder => {
    const fullPath = path.join(packsRoot, folder);
    return fs.statSync(fullPath).isDirectory();
  });

  const allPacks = [];

  genres.forEach(genre => {
    const genrePath = path.join(packsRoot, genre);
    const packs = fs.readdirSync(genrePath).filter(subfolder => {
      const subPath = path.join(genrePath, subfolder);
      return fs.statSync(subPath).isDirectory();
    });

    packs.forEach(pack => {
      const packPath = path.join(genrePath, pack);
      const allFiles = fs.readdirSync(packPath);
      const stickerFiles = allFiles
        .filter(isImageFile)
        .map(file => path.join('packs', genre, pack, file).replace(/\\/g, '/'));

      if (stickerFiles.length === 0) return;

      const infoPath = path.join(packPath, 'pack-info.json');
      let info = {
        name: pack,
        description: "",
        cover: "", // padrão vazio, será ajustado abaixo
        author: ""
      };

      if (fs.existsSync(infoPath)) {
        try {
          const rawInfo = JSON.parse(fs.readFileSync(infoPath));
          info.name = rawInfo.name || info.name;
          info.description = rawInfo.description || "";
          info.cover = rawInfo.cover
            ? path.join('packs', genre, pack, rawInfo.cover).replace(/\\/g, '/')
            : "";
          info.author = rawInfo.author || "";
        } catch (e) {
          console.warn(`⚠️ Erro ao ler pack-info de ${pack}:`, e.message);
        }
      }

      // Se o cover ainda estiver vazio, usa a primeira imagem
      if (!info.cover && stickerFiles.length > 0) {
        info.cover = stickerFiles[0];
      }

      allPacks.push({
        name: info.name,
        code: pack,
        description: info.description,
        cover: info.cover,
        author: info.author,
        stickers: stickerFiles
      });
    });
  });

  return allPacks;
}

function generateJsonFile() {
  const packs = getAllPacks();
  fs.writeFileSync(outputFile, JSON.stringify(packs, null, 2));
  console.log(`✅ Arquivo ${path.basename(outputFile)} gerado com ${packs.length} packs!`);
}

generateJsonFile();
