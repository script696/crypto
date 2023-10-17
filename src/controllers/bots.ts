import { Request } from 'express';

export class BotController {
  static addBot = async (req: Request<any>, res) => {
    try {
      res.send({
        message: 'success',
      });
    } catch {
      res.status(500).send({
        message: 'Ошибочка',
      });
    }
  };
}
