import { Request, Response } from 'express';
import { connection } from '../config/database';


export class UserController {
  async list(req: Request, res: Response): Promise<Response> {
    const [rows] = await connection.query('SELECT * FROM usuarios');
    return res.status(200).json(rows);
  }

  async getByName(req: Request, res: Response): Promise<Response> {
    const nome: string = String(req.query.params);

    const [rows]: any = await connection.query('SELECT * FROM usuarios WHERE nome = ?', [nome]);

    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    } else {
      return res.status(200).json(rows[0]);
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const [rows]: any = await connection.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
    return res.status(200).json(rows[0]);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { nome, email } = req.body;

    const [exist]: any = await connection.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (exist.length > 0) {
      return res.status(409).json({ mensagem: 'Email já cadastrado!' });
    }

    await connection.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email]);
    return res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nome, email } = req.body;
    await connection.query('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?', [nome, email, id]);
    return res.status(200).json({ mensagem: 'Usuário atualizado!' });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await connection.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return res.status(204).json({ mensagem: 'Usuário deletado com sucesso!' });
  }

  async login(req: Request, res: Response): Promise<Response> {
    const {nome, email} = req.body;

    if (!nome || !email) {
      return res.status(400).json({ mensagem: 'Nome e email são obrigatórios!'})
    }

    const [rows]: any = await connection.query('SELECT * FROM usuarios WHERE email = ? AND nome = ?', [email, nome]);

    if(rows.length === 0) {
      return res.status(401).json({ mensagem: 'Credenciais não autorizadas!'});
    }

    return res.status(200).json({ mensagem: 'Logado com sucesso!'})
  }
}