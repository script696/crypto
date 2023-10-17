import { Context } from 'telegraf';

type SessionData = {
  courseLike: boolean;
};

export interface IBotContext extends Context {
  session: SessionData;
}
