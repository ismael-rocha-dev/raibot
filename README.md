# RAIBOT
RAIBOT é um bot para discord que automatiza e facilita o trabalho dos membros do RAITec. Sua principal funcionalidade é monitorar o tempo de cada membro em uma reunião feita em uma call do discord. Atualmente esses dados são salvos em uma planilha do Google Sheets utilizando um outro serviço que criamos, mas posteriormente a ideia é que esses dados fiquem salvos em um banco de dados do RAITec.

## Iniciar o Bot
### Criar aplicação de BOT
Para testar o bot, crie uma aplicação de BOT no discord seguindo os passos disponíveis em: [Criar Aplicação de BOT](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot). Em produção, essa aplicação deve estar criada em uma conta do Discord separada para o RAITec.

### Adicionar o BOT em um servidor do discord
No [portal de desenvolvimento do discord](https://discord.com/developers/applications), acesse a tela da sua aplicação. No menu `OAuth2`, acesse `URL Generator`, selecione a caixa `bot` e então selecione as permissões que o BOT tem sobre o servidor em que ele será adicionado. É interessante que somente sejam dadas permissões necessárias - **Não adicione BOTs com permissões sensíveis no servidor do RAITec** - No caso, por enquanto o BOT só utiliza as permissões de `Read Messages/View Channels` and `Send Messages`.

### Iniciar o BOT no seu computador
Após isso, [crie um arquivo](https://discordjs.guide/creating-your-bot/#using-dotenv) `.env` na raiz do projeto (fora da pasta `src`) com as variáveis `TOKEN` e `CLIENT_ID` que podem ser obtidas da página do BOT que você criou. \\
**Obs: Não use o TOKEN da aplicação de produção, crie uma aplicação com a sua própria conta somente para desenvolvimento**.

exemplo do conteúdo do arquivo `.env`:

```
TOKEN="YoUrBoTtoKeN"
CLIENT_ID="YoUrBoTcLiEnTiD"
```
Antes de iniciar o programa, algumas bibliotecas usadas no código precisam de instalação, para isso, basta executar o comando `npm install`.

Agora é só rodar o comando `npm run dev` e o bot ira iniciar. Se você adicionou o BOT a algum servidor, ele aparecerá ativo no servidor e você poderar acessar os comandos por qualquer canal de texto do servidor.

### - 
## comandos

-   `/iniciar_reuniao`: inicia a contagem de tempo que os membros permaneceram na call no canal de voz. Você precisa estar em um canal de voz para usar este comando.

-   `/finalizar_reuniao`: encerra uma reunião e salva o tempo de cada membro na planilha de horas

-   `/link_da_planilha`: permite que o usuário informe o link da planilha que será usada no semestre.
