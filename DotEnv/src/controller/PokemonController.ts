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
                    'SELECT * FROM pc WHERE id = ?',
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
                    'INSERT INTO pokemons (nome_pokemon, nivel_pokemon, box_id) VALUES (?, ?, ?)',
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

            const rows = await connection.query('SELECT * FROM pokemons');

                console.info(`Retorno de registros do banco:`);
                console.table(rows);
            console.groupEnd();

            return res.status(200).json({
                rows
            })
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                erro: e
            })
        }
    }
}