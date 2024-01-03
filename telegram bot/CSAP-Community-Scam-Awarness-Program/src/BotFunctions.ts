import { Scenes, Telegraf, session, Context, Composer, Markup } from "telegraf";
import { BaseScene, SceneSession, Stage, WizardScene } from "telegraf/scenes";
import {
  InlineKeyboardButton,
  Update,
  InlineKeyboardMarkup,
  KeyboardButton,
} from "telegraf/types";
import { getAllUsersChatId, prisma } from "./ScamBase";
import { MyContext, bot } from "./app";
import { translate } from "@vitalets/google-translate-api";
type Msg = {
  data: string;
  button: InlineKeyboardMarkup;
};

type SyncSession = {
  scene: string;
  payload: {};
};

export async function TranslateToAmharic(textToTranslate: string) {
  const { text } = await translate(textToTranslate, { from: "en", to: "am" });
  return text;
}

export function syncUserSceneSession(command: string, state: SyncSession) {
  //function to set and check user scene ans session data;
  function update() {
    function set() {}

    function check() {}

    switch (command) {
      case "update":
        update();
        break;

      case "set":
        set();
        break;

      case "check":
        check();
        break;

      default:
        break;
    }
  }
}

export async function SendMessageFunction(message: Msg) {
  const ids = await getAllUsersChatId();
  ids.forEach((user) => {
    return bot.telegram.sendMessage(user.chatId, message.data, {
      reply_markup: message.button,
    });
  });
}

export async function SendMessageXFunction(message: any) {
  const ids = await getAllUsersChatId();
  ids.forEach((user) => {
    return bot.telegram.sendPhoto(
      user.chatId,
      {
        url: "https://www.digitaltveurope.com/files/2022/10/20220201-safaricom-kenya-logo.jpg",
      },
      {
        caption: message.title + "\n" + message.description,
        reply_markup: message.button,
      }
    );
  });
}

export async function SendFeedBack(message: Msg, cxt: MyContext) {
  let from = `${cxt.from?.username} ${cxt.from?.id}`;
  const admins = await prisma.admin.findMany();
  admins.forEach(async (item) => {
    return bot.telegram.sendMessage(
      item.chatId,
      from + "\n" + "\n" + `feedback :\n` + message,
      {
        reply_markup: {
          inline_keyboard: [[{ text: "reply", callback_data: "reply" }]],
        },
      }
    );
  });
}
