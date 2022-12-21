const { Collection } = require('discord.js');

const cargosDiscord_setores = new Collection();

// O primeiro parâmetro é o nome do cargo no discord, o segundo é a chave do objeto com os links das planilhas

cargosDiscord_setores.set('Inovação', 'inovacao');

cargosDiscord_setores.set('Adm', 'administracao');

cargosDiscord_setores.set('Mídias', 'midias');

module.exports = cargosDiscord_setores;
