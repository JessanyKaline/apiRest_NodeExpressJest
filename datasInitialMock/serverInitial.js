import app from "./src/app.js" //a extensão do arquivo deve ser colocada .js

const PORT = 3030 //porta que será rodada

/* Escuta a porta, está ouvindo o que acontece na porta acima, 
além disso no navegador se digitar http://localhost:3000/ e no 
arquivo app.js tiver algo como:
app.get('/', (req, res) => {
  res.send('Hello World!')
}) aparecerá 'Hello World!' */
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

/* Se o projeto estivesse sendo iniciado e não clonado,
para atualização do servidor, é necessário dar o start e'mata-lo' e
depois iniciar novamente a cada mudança, ou seja, no terminal é executado
o comando 'node server.js' e depois 'ctrl+c' e novamente 'node server.js'.

Afim de evitar esse procedimento repetitivo, basta instalar
a lib nodemon.

Após isso colocamos como dependencia de desenvolvimento
no packge.json "dev": "nodemon server.js" e o procedimento é automático, 
basta rodar 'npm run dev'.

(clonando o projeto e instalando, os passos acima não precisarão
ser realizados, basta instalar e rodar npm run dev)*/