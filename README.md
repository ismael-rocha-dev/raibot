# RAIBOT

RAIBOT é um bot para discord que gerencia reuniões, marca o tempo que cada membro permaneceu
em uma reunião e salva essas informações em uma planilha do Google sheets

## Iniciar o Bot

Para o programa funcionar corretamente, crie um arquivo .env com as variáveis `TOKEN` e `CLIENT_ID`
ex:

```
TOKEN="YoUrBoTtoKeN"
CLIENT_ID="YoUrBoTcLiEnTiD"
```

## comandos

-   `/iniciar_reuniao`: inicia a contagem de tempo que os membros permaneceram na call no canal de voz. Você precisa estar em um canal de voz para usar este comando.

-   `/finalizar_reuniao`: encerra uma reunião e salva o tempo de cada membro na planilha de horas
