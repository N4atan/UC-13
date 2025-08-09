import { Application , NextFunction , Request , Response } from "express";

const defaultMiddlware = (req: Request, res: Response, next: NextFunction) => {
    const actualPath = req.baseUrl + req.url;
    console.clear();
    console.log(`📢 Requisição recebida em: ${actualPath}`);
    next();
};

export default defaultMiddlware;