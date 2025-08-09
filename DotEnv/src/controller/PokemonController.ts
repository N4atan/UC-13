import { Request, Response } from 'express';
import { connection } from '../database/connection';
import Pokemon from '../models/Pokemon';
import { ResultSetHeader } from 'mysql2';




export default class PokemonController {
    async create(req: Request, res: Response) {
        try {
            const { nome, nivel, box_id } = req.body;

            if (!nome || !nivel || !box_id) { return res.status(400).json({ erro: 'Nome, Nível e Box são campos obrigatórios.' }); }


            console.group();
                console.info(`Checando Existencia da Box.`)

                let boxExists: any = await connection.query(
                    'SELECT * FROM pokedex WHERE id = ?',
                    [box_id]
                )

                console.info(`Retorno de registros do banco:`);
                console.table(boxExists);

                if(boxExists.length == 0) {
                    return res.status(404).json({
                        info: 'Box não encontrada!',
                    });
                }
            console.groupEnd();

            console.group()
                console.info(`Cadastrando Pokemon.`);

                let entityPokemon = new Pokemon(nome, nivel, box_id)

                let [ result ] = await connection.query<ResultSetHeader>(
                    'INSERT INTO pokedex (nome_pokemon, nivel_pokemon, box_id) VALUES (?, ?, ?)',
                    [ nome , nivel , box_id ]
                );

                entityPokemon.id = result.insertId;

                console.info(`Pokemon criado com sucesso!`);
                console.table(entityPokemon);
            console.groupEnd();

            return res.status(201).json({
                info: `Pokemon criado com sucesso!`,
                content: entityPokemon
            })

        } catch (e) {
            console.error(e);
            return res.status(500).json({
                erro: e
            })
        }
    }

    async list(req: Request, res: Response){
        try{
            console.group();
                console.info('Iniciando busca.');

            const [ rows ] = await connection.query('SELECT * FROM pokedex');

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
        try {
            const { id } = req.params;
            
            if (!id) { return res.status(400).json({ erro: 'ID é obrigatório.' }); }

            console.group();
                console.info('Iniciando busca.');

            let row: any = await connection.query(
                'SELECT * FROM pokedex WHERE id = ?',
                [id]
            )
            
            
                console.info(`Retorno de registros do banco:`);
                console.table(row);
            console.groupEnd();

            if(row.length == 0) { 
                return res.status(404).json({
                    info: 'Pokemon não encontrado!'
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
        //'INSERT INTO pokemons (nome_pokemon, nivel_pokemon, box_id) VALUES (?, ?, ?)',
        try {
            const { id } = req.params;

            const { nome, nivel, box_id } = req.body;

            if (!id || !nome || !nivel || !box_id) { return res.status(400).json({ erro: 'ID, Nome, Nível e Box são campos obrigatórios.' }); }

            const [ result ] = await connection.query<ResultSetHeader>(
                'UPDATE pokedex SET nome_pokemon = ?, nivel_pokemon = ?, box_id = ? WHERE id = ?',
                [ nome , nivel , box_id , id ]
            )

            if (result.affectedRows == 0) { return res.status(400).json({ mensagem: 'Pokemon não encontrada!' }); }

            return res.status(204).send();
            
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                erro: e
            })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try{
            const { id } = req.params;
        
            if (!id) { return res.status(400).json({ erro: 'ID é obrigatório.' }); }

            const [ result ] = await connection.query<ResultSetHeader>(
                'DELETE FROM pokedex WHERE id = ?',
                [ id ]
            )
            if (result.affectedRows == 0) { return res.status(400).json({ mensagem: 'Pokemon não encontrada!' }); }

            return res.status(204).send();
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                erro: e
            })
        }
    } 
}