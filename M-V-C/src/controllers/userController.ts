import { Request, Response } from 'express'       ;
import { User, users       } from '../models/User';
import { json } from 'stream/consumers';

export const createUser = ( req: Request, res: Response ): Response => {
    const { id, name, email } = req.body;
    const nUser               = new User( id, name, email );

    users.push(nUser);
    return res.status(201).json({ message: 'User created!', user: nUser });
}

export const readUsers = ( req: Request, res: Response ): Response => {
    return res.status(200).json( users );
}

export const findById = ( req: Request, res: Response ): Response => {
    const fId        = Number(req.params.id);
    const fUser     = users.find(u => u.id == fId);

    if(!fUser) return res.status(404).json({ message: `Not find User by ID$: ${fId}` });

    return res.status(200).json({fUser});
}

export const updateById = ( req: Request, res: Response ): Response => {
    const fId               = Number(req.params.id);
    const { name, email }   = req.body;

    const fUser     = users.find(u => u.id == fId);

    if(!fUser) return res.status(404).json({ message: `Not find User by ID$: ${fId}` });

    fUser.name  = name   || fUser.name;
    fUser.email = email  || fUser.email;

    return res.status(200).json({ mensagem: "Data user updated!", fUser });
}

export const deleteById = ( req: Request, res: Response ): Response => {
    const fId               = Number(req.params.id);
    const fIndex     = users.findIndex(u => u.id == fId);

    if(fIndex === -1) return res.status(404).json({ message: `Not find User by ID$: ${fId}` });

    users.splice(fIndex, 1);
    return res.status(200).json({ message: "Deleted!" });   
}