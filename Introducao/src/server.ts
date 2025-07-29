import express, { Application, NextFunction, Request, Response, response } from 'express';

const app: Application = express();
const PORT: number = 3000;

let comentarios: Array<string> = [];

const porteiroMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Requisição feita em: ${new Date().toString()}`);

    next(); // Libera a requisição para seguir
};


app.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({ mensagem: 'Rota não encontrada!' });
})

app.get('/', ((req: Request, res: Response): Response => {
    return res.send("Olá");
}))


app.get('/sobre', ((req: Request, res: Response): Response => {
    let eu = {
        nome: 'Natan',
        idade: 18,
        about: 'Jovem estudante full-stack'
    };

    return res.status(200).json({ mensagem: `Olá Viagante! Me chamo ${eu.nome}, tenho ${eu.idade}. Um pouco sobre mim: ${eu.about}` })
}))

app.post('/comentarios', (req: Request, res: Response): Response => {
    const { text } = req.body;

    if(text == null) return res.status(400).json({ message: 'Sem texto recebido!'});

    comentarios.push(text);
    return res.status(201).json({ message: 'Comentário recebido e salvo com sucesso!'});
})

app.delete('/comentarios/:id', ((req: Request, res: Response): Response => {
    const { id } = req.params;

    if(!id) return res.status(400).json({ mensagem: 'Usuário(ID) não informado!'});

    comentarios.splice(Number(id), 1);
    
    return res.status(204).json({ mensagem: 'Excluido com sucesso!'});
}))




app.use(express.json());
app.use(porteiroMiddleware); // Middleware global