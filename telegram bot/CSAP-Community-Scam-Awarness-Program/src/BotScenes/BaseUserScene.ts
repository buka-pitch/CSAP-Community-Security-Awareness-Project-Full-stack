import { MyContext } from "../app";
import { Markup } from "telegraf";
import { BaseScene } from "telegraf/scenes";
import { ButtonType } from "./DynamicWizardScene";
import { getAllCourses } from "../CourseFunctions";
import { NextFunction } from "express";
import { TranslateToAmharic } from "../BotFunctions";

export const BaseUserScene = new BaseScene<MyContext>("BaseUserScene");
BaseUserScene.enter(async (cxt: MyContext, next: NextFunction) => {
  cxt.replyWithChatAction("typing");

  cxt.reply(
    "-",
    Markup.keyboard(
      [
        { text: "Scan Link 🔗", hide: false },
        { text: "Share ⏩", hide: false },
        { text: "Scan File 📂", hide: false },
        { text: "Check for new Course 🎓", hide: false },
        { text: "Change language ⚙️", hide: false },
        { text: "Send Feedback 💬", hide: false },
        { text: " 👨🏻‍💻Hire the Developer 📞", hide: false },
      ],
      {
        columns: 2,
      }
    ).resize(true)
  );

  return next();
  // cxt.({ "inline_keyboard": [[{ "text": "Continue and learn More ->", "callback_data": "next" }]] });
  // return cxt.scene.enter("enrolledUserScene");
});

BaseUserScene.hears(
  "Scan File 📂",
  async (cxt: MyContext, next: NextFunction) => {
    next();
  }
);
BaseUserScene.hears(
  "Scan Link 🔗",
  async (cxt: MyContext, next: NextFunction) => {
    await cxt.replyWithMarkdownV2("``` Paste the Url to Scan```");
    next();
  }
);
BaseUserScene.hears(
  "Change language ⚙️",
  (cxt: MyContext, next: NextFunction) => {
    cxt.sendMessage(
      "Choose the available languages from the keyboard menu\nNote that this will only change your course language",
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "AMHARIC", callback_data: "lang=am" },
              { text: "ENGLISH", callback_data: "lang=en" },
            ],
          ],
        },
      }
    );
    next();
  }
);

BaseUserScene.hears("Next", async (cxt: MyContext, next: NextFunction) => {
  cxt.scene.enter("enrolledUserScene");
  next();
});
BaseUserScene.hears("Share ⏩", async (cxt: MyContext, next: NextFunction) => {
  await cxt.scene.enter("OneQuestionscene", { Caller: "share" });
  return next();
});
BaseUserScene.hears(
  "Send Feedback 💬",
  async (cxt: MyContext, next: NextFunction) => {
    cxt.session.userAnswer = "";
    await cxt.scene.enter("OneQuestionscene", {
      Caller: "feedback",
    });
  }
);

BaseUserScene.hears("👨🏻‍💻Hire the Developer 📞", () => {});
BaseUserScene.hears(
  "Check for new Course 🎓",
  async (cxt: MyContext, next: NextFunction) => {
    const courses = await getAllCourses();
    let button: ButtonType = [{ text: "", callback_data: "0", hide: false }];
    let inlinekeyboard = courses.forEach((item, index) => {
      return button.push({
        text: item.title,
        callback_data: item.id.toString(),
        hide: false,
      });
    });

    await cxt.replyWithMarkdown(
      "``` - Available Courses -```\n",
      Markup.inlineKeyboard(button, { columns: 1 })
    );
  }
);

BaseUserScene.on(
  "callback_query",
  async (cxt: MyContext, next: NextFunction) => {
    console.log(cxt.update.callback_query.data);
    if (cxt.callbackQuery.data == "lang=am") {
      cxt.session.lang = "am";
      return cxt.answerCbQuery(
        await TranslateToAmharic("your request is completed")
      );
    }
    if (cxt.callbackQuery.data === "Next") {
      cxt.answerCbQuery("Continued");
      cxt.scene.enter("enrolledUserScene");
    } else {
      let course = await getAllCourses();
      course.forEach((item, index) => {
        if (cxt.callbackQuery.data === item.id) {
          if (item.content.length > 0) {
            cxt.session.courseId = item.id;
            cxt.session.courseIndex = index;
            cxt.session.courseTitle = item.title;
            cxt.session.newCourse = true;
            cxt.session.lessonTitle = item.content[0].title;
            cxt.session.lessonIndex = null;
            cxt.answerCbQuery(`starting - ${item.title}`);
            return cxt.scene.enter("LessonScene");
          } else cxt.answerCbQuery("Course Comming Soon!");
        }
      });
    }
  }
);
