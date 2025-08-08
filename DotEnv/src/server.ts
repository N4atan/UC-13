import express, { Application } from "express";


const app: Application = express();
const PORT: number = 3000;

app.use(express.json()); // DEFINE QUE MINHA API TRABALHA COM JSON

app.use('/api'); //QUERO UTILIZAR MINHAS ROTAS

app.listen(PORT, () => {
    console.clear();
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
})