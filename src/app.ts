import * as express from 'express';
import { router } from 'routes';
import * as bodyParser from 'body-parser';
import { ConfigService } from 'config/config.service';
import { IConfigService } from 'config/config.interface';
import { session, Telegraf } from 'telegraf';
import { IBotContext } from 'context/context.interface';
import { Command } from 'commands/commands.class';
import { StartCommand } from 'commands/start.command';
import { DatabaseService } from 'database/database.service';
import { CryptomusService } from 'cryptomus/cryptomus.service';
import { IDataBase } from 'database/database.interface';
import { ICryptomusService } from 'cryptomus/cryptomus.interface';
import { CronService } from 'cron/cron.service';

const { PORT = 6000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

class Bot {
  bot: Telegraf<IBotContext>;
  commands: Array<Command> = [];

  constructor(
    private readonly configService: IConfigService,
    private readonly databaseService: IDataBase,
    private readonly cryptomusService: ICryptomusService,
  ) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('TOKEN'));
    this.bot.use(session());
  }

  async init() {
    await new CronService(
      this.databaseService,
      this.cryptomusService,
      this.bot,
    ).init();

    await this.databaseService.init();
    this.commands = [
      new StartCommand(this.bot, this.cryptomusService, this.databaseService),
    ];
    console.log(this.commands);

    for (const command of this.commands) {
      command.handle();
    }
    this.bot.launch();
  }
}
const configService = new ConfigService();
const cryptomusService = new CryptomusService(configService);
const dataBase = new DatabaseService();
const bot = new Bot(configService, dataBase, cryptomusService);
bot.init();
