import { MyContext, MyWizardSession, bot } from "../app";
import { Scenes, Telegraf, session, Context, Composer, Markup } from "telegraf";
import { BaseScene, Stage, WizardScene } from "telegraf/scenes";
import { InlineKeyboardButton, Update } from "telegraf/types";
import { CreateCourse } from "../CourseFunctions";
import { GenerateBotScamLink, prisma } from "../ScamBase";
import { Question } from "@prisma/client";
import { NextFunction } from "express";
import { SendFeedBack, SendMessageFunction } from "../BotFunctions";

export const CreateCourseScene = new WizardScene<MyContext>(
  "CreateCourseScene",
  async (cxt, next) => {
    await cxt.sendMessage("Course Title ? ");
    return cxt.wizard.next();
  },
  async (cxt, next) => {
    if (cxt?.message?.text) {
      cxt.scene.state.course = {};
      cxt.scene.state.course.title = cxt.message.text;

      await cxt.sendMessage("Description of the course ?");
      return cxt.wizard.next();
    } else {
      return cxt.wizard.back();
    }
  },
  async (cxt, next) => {
    if (cxt?.message?.text) {
      cxt.scene.state.course.description = cxt.message.text;
      const createdCourse = await CreateCourse(
        cxt.scene.state.course.title,
        cxt.scene.state.course.description
      ).then(async (res) => {
        await cxt.sendMessage(res);
        if (res === "Couldn't create the Course") {
          cxt.sendMessage("Couldn't create the Course");
        }
      });
      return cxt.scene.leave();
    } else {
      return cxt.wizard.back();
    }
  }
);

export const OneQuestionscene = new WizardScene<MyContext>(
  "OneQuestionscene",
  async (cxt: MyContext, next: NextFunction) => {
    if (cxt.scene.session.state?.Caller === "sendmsg") {
      await cxt.sendMessage("Enter Your Message ");
      return cxt.wizard.next();
    }
    if (cxt.scene.session.state?.Caller === "feedback") {
      await cxt.sendMessage("Send Your Fedback -");
      return cxt.wizard.next();
    }
    if (cxt.scene.session.state?.Caller === "share") {
      await cxt.sendMessage("Enter you message or description to your friend");
      return cxt.wizard.next();
    }
    if (cxt.scene.session.state?.question) {
      cxt.sendMessage(await cxt.scene.session.state.question);
    } else {
      cxt.replyWithMarkdown(
        "When Sharing to Friends you can customize the label of the link \n the lebel should be and text that you know your friends will fall for to trick them and get the full experiance on scam.\n something like `Get free Gift`\n what should be the label for the link ?"
      );
    }
    return cxt.wizard.next();
  },
  async (cxt: MyContext, next: NextFunction) => {
    if (cxt?.message?.text) {
      cxt.session.userAnswer = cxt.message.text;
    }

    if (cxt.scene.session.state?.Caller === "sendmsg") {
      SendMessageFunction({
        data: cxt.session.userAnswer,
        button: {
          inline_keyboard: [[{ text: "", callback_data: "start" }]],
        },
      });
      return cxt.scene.enter("BaseAdminScene");
    }
    if (cxt.scene.session.state?.Caller === "feedback") {
      SendFeedBack(cxt.session.userAnswer, cxt);
    }

    if (cxt.scene.session.state?.Caller === "share") {
      let botUsername = await bot.telegram.getMe();
      let mybotUsername = botUsername.username;
      let link = GenerateBotScamLink(cxt.session.userAnswer, mybotUsername);
      let csap_message =
        "```    Community Scam and Digital Security Traning\nCSAP will help you learn, protect and prevent Social media Account Attacks\n- dont get scamed again use CSAP learn well how to protect yourself\nidentify attack vectors and scams```";
      await cxt.sendMessage(cxt.session.userAnswer + "\n" + csap_message, {
        parse_mode: "Markdown",
        allow_sending_without_reply: true,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Start CSAP",
                callback_data: "shared",
                url: link,
              },
            ],
          ],
        },
      });
    }
    return cxt.scene.enter("BaseUserScene");
  }
);

//______________________ Render question ________________________
