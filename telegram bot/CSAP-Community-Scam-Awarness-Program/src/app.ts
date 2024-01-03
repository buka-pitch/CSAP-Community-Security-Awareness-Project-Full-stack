import { Scenes, Telegraf, session, Context, Markup } from "telegraf";
import { AdminCheck, SaveSession } from "./ScamBase";
import { BaseAdminScene } from "./BotScenes/BaseAdminScene";
import { BaseUserScene } from "./BotScenes/BaseUserScene";
import { EnrolledUserScene } from "./BotScenes/EnrolledUserScene";
import {
  CreateLessonScene,
  CreateQuestionScene,
} from "./BotScenes/CreateLessonScene";
import {
  CreateCourseScene,
  OneQuestionscene,
} from "./BotScenes/OneQuestionScene";
import {
  CompleteLessonScene,
  LessonScene,
  ViewLesson,
} from "./BotScenes/DynamicWizardScene";
// import { prisma } from "./ScamBase";
import { alertMsg } from "./constant";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import { sleepSync } from "bun";
import { NextFunction } from "express";

const prisma = new PrismaClient();

export interface MyWizardSession extends Scenes.WizardSessionData {
  myWizardSessionProp: object;
}

export interface MyContext extends Context {
  session: any;
  ContextProp: {
    startUrl: string;
    data: {};
  };
  scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
  wizard: Scenes.WizardContextWizard<MyContext>;
}
const tokken: string = process.env.TGSECRET;
export const bot = new Telegraf<MyContext>(tokken);
bot.use(
  session({
    store: {
      async get(key) {
        const session = await prisma.session.findUnique({
          where: { id: key },
        });
        return JSON.parse(session?.data?.toString() || "{}");
      },
      async set(key, value) {
        await prisma.session.upsert({
          where: { id: key },
          update: { data: JSON.stringify(value) },
          create: { id: key, data: JSON.stringify(value) },
        });
      },
      async delete(key) {
        await prisma.session.delete({ where: { id: key } });
      },
    },
    async getSessionKey(ctx) {
      let userid = await prisma.users
        .findUnique({
          where: { chatId: ctx?.from?.id },
        })
        .then((user) => {
          return user?.id;
        });

      return userid;
    },
  })
);

const stage = new Scenes.Stage<MyContext>(
  [
    EnrolledUserScene,
    BaseAdminScene,
    BaseUserScene,
    CreateLessonScene,
    CreateQuestionScene,
    OneQuestionscene,
    ViewLesson,
    CreateCourseScene,
    LessonScene,
    CompleteLessonScene,
  ],
  { default: "BaseUserScene" }
);

bot.use(stage.middleware());

bot.on("message", async (cxt, next) => {
  console.log(cxt.session);
  await next();
});

bot.telegram.setMyCommands([
  {
    description:
      "Share this platform for your loved one, help them learn, protect, and prevent all these risk and threats.",
    command: "share",
  },
  {
    description: "you have some thing to say. send fedback - /fedback message",
    command: "/fedback",
  },
  { description: "start or restart the bot", command: "/start" },
  {
    description: "Get All Informations about this bot and CSAP project ",
    command: "/info",
  },
  { description: "Get help about how to use this bot", command: "/help" },
]);
bot.on("callback_query", async (cxt: MyContext, next: NextFunction) => {
  console.log(cxt.update.callback_query.data);
  next();
});

bot.command("start", async (cxt: MyContext, next) => {
  const user = await SaveSession(
    cxt.from.id,
    cxt.from.first_name + " " + cxt.from.last_name
  ).then((res) => {
    cxt.session.newCourse = false;
  });

  const isAdmin = await AdminCheck(cxt.from.id);

  if (cxt.session.role) {
    switch (cxt.session.role) {
      case "Admin":
        stage.options.default = "BaseAdminScene";
        return await next();
        break;
      case "User":
        stage.options.default = "BaseUserScene";
        return await next();
        break;

      default:
        break;
    }
  }
  if (isAdmin) {
    stage.options.default = "BaseAdminScene";
    cxt.session.role = "Admin";
    return cxt.scene.enter("BaseAdminScene");
  } else {
    cxt.replyWithMarkdown(
      alertMsg,
      Markup.inlineKeyboard([{ text: "Next", callback_data: "Next" }])
    );
    stage.options.default = "BaseUserScene";
    cxt.session.role = "User";
    cxt.scene.enter("BaseUserScene", { initial: true });
  }
  // if (cxt.argstage..length > 1) cxt.ContextProp.data.push(cxt.args[1].toString() || "");
  // if (cxt.args.length === 1) cxt.ContextProp.startUrl = cxt.args[0];
});

bot.on("text", async (cxt, next) => {
  if (cxt?.message?.text.includes("http")) {
    cxt.replyWithChatAction("typing");
    await cxt.reply("scanning url ..");

    const url = await cxt.message?.text;
    console.log(url);
    const encodedParams = new URLSearchParams();
    encodedParams.set("url", url);

    const options = {
      method: "POST",
      url: "https://www.virustotal.com/api/v3/urls",
      headers: {
        accept: "application/json",
        "x-apikey": process.env.VIRUSTOTAL_KEY,
        "content-type": "application/x-www-form-urlencoded",
      },
      data: encodedParams,
    };
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .then(async (data) => {
        const options2 = {
          method: "GET",
          url: "https://www.virustotal.com/api/v3/analyses/" + data.id,
          headers: {
            accept: "application/json",
            "x-apikey": process.env.VIRUSTOTAL_KEY,
          },
        };

        sleepSync(10);

        let res = await axios
          .request(options2)
          .then(async function (response) {
            cxt.reply("scanning url ....");
            let stats = response.data.data.attributes.stats;

            console.log(stats);
            await cxt.sendMessage(
              `malicious : ${stats["malicious"]}\nsuspicious : ${stats["suspicious"]}\nclean : ${stats["harmless"]}`
            );

            if (stats["malicious"] > 0) {
              await cxt.reply(
                `this url is marked as malicious by ${stats["malicious"]} anti-viruses \n its recommanded that you don't use or open it ! `
              );
            }
            if (stats["suspicious"] > 0) {
              await cxt.reply(
                `this url has been marked as suspicious by ${stats["suspicious"]} anti-viruses. opening or using it may put you on risks !`
              );
            }
            if (stats["suspicious"] === 0 && stats["malicious"] === 0) {
              await cxt.reply(
                `this url seems to be clean but make sure you trust the sender before you open it !`
              );
            }

            await cxt.sendMessage(
              ` detected by ${
                stats["malicious"] + stats["suspicious"]
              } Anti-Viruses`
            );
          })
          .catch(function (error) {
            console.error(error);
            cxt.reply("please try again in a minute");
            return error.message;
          });

        return res;
      })
      .catch(function (error) {
        if (error.message.includes("401")) {
          cxt.reply("please try again after 1 minute");
        } else {
          cxt.reply("please try again in a minute");
          console.error(error);
        }
      });
  }
  return await next();
});

bot.on("document", (cxt) => {
  cxt.replyWithChatAction("upload_document");
  cxt.reply("file recived");
});

bot.catch((err, cxt) => {
  console.log(err);
});

bot
  .launch({ dropPendingUpdates: false })

  .catch((error) => {
    console.error(error);
  });

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
