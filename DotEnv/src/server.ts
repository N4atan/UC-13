import { Application , NextFunction , Request , Response } from "express";
import defaultMiddleware from './middlewares/defaultMiddleware';
import pokemonRouter from './routers/PokemonRouter';
import boxRouter from './routers/BoxRouter';
import express from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json()); // DEFINE QUE MINHA API TRABALHA COM JSON

app.use('/pokedex', pokemonRouter); //QUERO UTILIZAR MINHAS ROTAS
app.use('/pc', boxRouter)
  
app.use((req: Request, res: Response): Response => {
    return res.status(404).json({ mensagem: 'Rota não encontrada!' });
});

app.use(defaultMiddleware);

app.listen(PORT, () => {
    console.clear();
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
})