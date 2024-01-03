import { MyContext, MyWizardSession } from "../app";
import {
  Scenes,
  Telegraf,
  session,
  Context,
  Composer,
  Markup,
  Telegram,
} from "telegraf";
import { BaseScene, Stage, WizardScene } from "telegraf/scenes";
import { InlineKeyboardButton, Update } from "telegraf/types";
import { CountUser, prisma, getAllUsersChatId } from "../ScamBase";
import { createQuestion, getAllCourses } from "../CourseFunctions";
import { ButtonType } from "./DynamicWizardScene";
import { TranslateToAmharic } from "../BotFunctions";

export const CreateQuestionScene = new WizardScene<MyContext>(
  "CreateQuestionScene",
  async (cxt, next) => {
    const courses = await prisma.lesson.findMany();
    let button: ButtonType = [{ text: "", callback_data: "0", hide: false }];
    let inlinekeyboard = courses.forEach((item, index) => {
      return button.push({
        text: item.title,
        callback_data: item.title.toString(),
        hide: false,
      });
    });

    await cxt.sendMessage(
      "Which lesson do you want to add Question to ?\n",
      Markup.inlineKeyboard(button, { columns: 1 })
    );
  },
  async (cxt, next) => {
    if (await cxt.session?.lessonTitle) {
      await cxt.sendMessage("Question title ?");
      return cxt.wizard.next();
    }
    return cxt.wizard.back();
  },
  async (cxt, next) => {
    if (await cxt.message?.text) {
      cxt.session.question = cxt.message.text;
      await cxt.sendMessage("Question choices (separated by .)");
      return cxt.wizard.next();
    }
    return cxt.wizard.back();
  },
  async (cxt, next) => {
    if (await cxt.message?.text) {
      cxt.session.choise = cxt.message.text;
      await cxt.sendMessage("The Correct Answer for the question ?");
      return cxt.wizard.next();
    }
    return cxt.wizard.back();
  },
  async (cxt, next) => {
    if (await cxt.message?.text) {
      cxt.session.correct_answer = cxt.message.text;
      let choice = cxt.session?.choise.toString().split(".");
      let question = await createQuestion(cxt.session.lessonTitle, {
        question: cxt.session.question,
        answer: cxt.session.correct_answer,
        choice: choice,
      });
      cxt.reply(question);
      return cxt.scene.leave();
    }
    return cxt.wizard.back();
  }
);

CreateQuestionScene.on("callback_query", async (cxt, next) => {
  if (cxt.callbackQuery.data) {
    cxt.session.lessonTitle = cxt.callbackQuery.data;
    cxt.answerCbQuery();
    cxt.sendMessage(cxt.session.lessonTitle);
    cxt.wizard.next();
    return await next();
  }
});

export const CreateLessonScene = new WizardScene<MyContext>(
  "CreateLessonScene",
  async (cxt, next) => {
    await cxt.sendMessage(
      "Provide the Course title that you want to add lesson for : "
    );
    return cxt.wizard.next();
  },
  async (cxt, next) => {
    if (cxt?.message?.text) {
      cxt.scene.session.myWizardSessionProp = {
        course: "",
        title: "",
        description: "",
      };
      cxt.scene.session.myWizardSessionProp.course = cxt.message.text;

      await cxt.sendMessage("Title of the lesson ?");
    }
    return cxt.wizard.next();
  },
  async (cxt, next) => {
    if (cxt?.message?.text) {
      cxt.scene.session.myWizardSessionProp.title = cxt?.message?.text;
    }
    await cxt.sendMessage("Enter you lesson with detail description !");
    return cxt.wizard.next();
  },
  async (cxt, next) => {
    if (cxt.message?.text) {
      cxt.scene.session.myWizardSessionProp.description = cxt.message.text;
      const courseId = await prisma.course
        .findUnique({
          where: { title: cxt.scene.session.myWizardSessionProp.course },
        })
        .catch((err) => {
          console.log(err.message);
          cxt.sendMessage("Course Not Found!");
        })
        .then((res) => {
          return res?.id;
        });

      const lesson = await prisma.lesson
        .create({
          data: {
            courseId: courseId,
            title: cxt.scene.session.myWizardSessionProp.title,
            description: cxt.scene.session.myWizardSessionProp.description,
          },
        })
        .catch((error) => {
          console.log(error.message);
        });

      if (!lesson) {
        cxt.sendMessage(
          cxt.session.lang == "am"
            ? await TranslateToAmharic("Lesson Couldn't be Created1")
            : "Lesson Couldn't be Created1"
        );
        return cxt.scene.leave();
      }
      const ids = await getAllUsersChatId();
      ids.forEach((user) => {
        return cxt.telegram.sendMessage(
          user.chatId,
          lesson.title + "\n" + lesson.description
        );
      });
    }
  }
);
