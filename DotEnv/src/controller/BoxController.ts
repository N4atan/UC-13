import { Request, Response } from 'express';
import { connection } from '../database/connection';
import { ResultSetHeader } from 'mysql2';
import Box from '../models/Box';


export default class BoxController {
    async create(req: Request, res: Response): Promise<Response> {
        const { nome , treinador } = req.body;

        if (!nome || !treinador) { return res.status(400).json({ erro: 'Nome e treinador são campos obrigatórios.' }); }

        let entityBox = new Box(nome, treinador);

        try {
            const [ result ] = await connection.query<ResultSetHeader>(
                'INSERT INTO pc (nome_box, treinador_dono) VALUES (? ?)',
                [ nome , treinador ]
            )

            entityBox.id = result.insertId;

            console.group();
                console.info(`Box criada com sucesso!`);
                console.table(entityBox);
            console.groupEnd();

            return res.status(201).json({
                info: `Box criada com sucesso!`,
                content: entityBox
            })

        } catch (e) {
            console.error(e);
            return res.status(500).json({
                erro: e
            })
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        try {
            const  [ rows ] = await connection.query('SELECT * FROM pc');

            console.group();
                console.info(`Retorno de registros do banco:`);
                console.table(rows);
            console.groupEnd();

            return res.status(201).json(rows)

        } catch (e) {
            console.error(e);
            return res.status(500).json({
                erro: e
            })
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        
        if (!id) { return res.status(400).json({ erro: 'ID é obrigatório.' }); }

        try {
            let row: any = await connection.query(
                'SELECT * FROM pc WHERE id = ?',
                [id]
            )
            
            console.group();
                console.info(`Retorno de registros do banco:`);
                console.table(row);
            console.groupEnd();

            if(row.length == 0) { 
                return res.status(404).json({
                    info: 'Box não encontrada!'
                });
            }

            return res.status(200).json(row[0]);
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                erro: e
            })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const { nome , treinador } = req.body;

        if (!id || !nome || !treinador) { return res.status(400).json({ erro: 'ID, Nome e treinador são campos obrigatórios.' }); }

        try {
            const [ result ] = await connection.query<ResultSetHeader>(
                'UPDATE pc SET nome_box = ?, treinador_dono = ? WHERE id = ?',
                [ nome , treinador , id]
            )

            if (result.affectedRows == 0) { return res.status(400).json({ mensagem: 'Box não encontrada!' }); }

            return res.status(204).send();
            
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                erro: e
            })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        
        if (!id) { return res.status(400).json({ erro: 'ID é obrigatório.' }); }

        try{
            const [ result ] = await connection.query<ResultSetHeader>(
                'DELETE FROM pc WHERE id = ?',
                [ id ]
            )
            if (result.affectedRows == 0) { return res.status(400).json({ mensagem: 'Box não encontrada!' }); }

            return res.status(204).send();
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                erro: e
            })
        }
    } 
}