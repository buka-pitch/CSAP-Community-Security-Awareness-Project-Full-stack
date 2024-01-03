import { MyContext, MyWizardSession } from "../app";
import { Scenes, Telegraf, session, Context, Composer, Markup } from "telegraf";
import { BaseScene, Stage, WizardScene, SceneSession } from "telegraf/scenes";
import { InlineKeyboardButton, Update } from "telegraf/types";
import { GenerateScamLink, CountUser, prisma } from "../ScamBase";
import { getAllCourses, getCourse } from "../CourseFunctions";
import { SendMessageFunction, SendMessageXFunction } from "../BotFunctions";
import { sendTemplate } from "../constant";
import { NextFunction } from "express";

export const BaseAdminScene = new BaseScene<MyContext>("BaseAdminScene");

BaseAdminScene.enter((cxt) => {
  cxt.sendMessage(
    "welcome back " + cxt.from?.first_name,
    Markup.keyboard([
      ["Create new Course", "New Lesson", "New Question"],
      ["Get Courses", "Get Course Data", "Active User+", "Generate Link"],
      ["Send new Msg"],
    ])
      .persistent(true)
      .resize(true)
  );
  cxt.sendMessage(
    "<< Quick Access  >>",
    Markup.inlineKeyboard(
      [
        [
          { text: "Create new Course", callback_data: "Create new Course" },
          { text: "Get Courses", callback_data: "GetCourse" },
        ],
        [{ text: "Create a Lesson", callback_data: "newLesson" }],
        [{ text: "Create a Question", callback_data: "newQuestion" }],
        [{ text: "Get User Count", callback_data: "getUserCount" }],
        [{ text: "Generate a new Scam Link", callback_data: "generateLink" }],
        [{ text: "Send Msg For All Users", callback_data: "sendMsg" }],
      ],
      { wrap: true }
    )
  );
});

BaseAdminScene.hears(
  "New Lesson",
  async (cxt, next) => {
    cxt.scene.enter("CreateLessonScene");
  }
  // const lesson = await prisma.lesson.create({where:{}})
);
BaseAdminScene.hears("Get Courses", async (cxt) => {
  const courses: any[] = await getAllCourses();
  const CourseTitles: string[] = [];
  if (courses.length === 0) return cxt.sendMessage("No Course Found!");
  courses.forEach((element: any) => {
    CourseTitles.push(element.title);
  });

  cxt.sendMessage(
    "Available Courses\n" + CourseTitles.join().replaceAll(",", "\n")
  );
});

BaseAdminScene.hears("Get Course Data", async (cxt, next) => {
  const courses = await getAllCourses();
  courses.forEach((element) => {
    cxt.reply(element.title);
    element.content.forEach((item) => {
      cxt.reply("->  " + item.title);
    });
  });
});

BaseAdminScene.hears("Create new Course", async (cxt) => {
  cxt.scene.enter("CreateCourseScene");
});
BaseAdminScene.hears("New Question", async (cxt, next) => {
  cxt.scene.enter("CreateQuestionScene");

  return next();
});
BaseAdminScene.hears("Active User+", async (cxt) => {
  let count = await CountUser().then((result) => {
    cxt.deleteMessage();
    cxt.sendMessage(result.toString());
  });
});
BaseAdminScene.hears("Generate Link", (cxt, next) => {
  SendMessageXFunction(sendTemplate);
  next();
});
BaseAdminScene.hears(
  "Send new Msg",
  async (cxt: MyContext, next: NextFunction) => {
    cxt.scene.enter("OneQuestionscene", { Caller: "sendmsg" });
    next();
  }
);

BaseAdminScene.on("callback_query", async (cxt) => {
  switch (cxt.callbackQuery.data) {
    case "newLesson":
      break;

    case "newQuestion":
      break;
    case "getUserCount":
      let count = await CountUser().then((result) => {
        return cxt.reply(result.toString());
      });
      break;
    case "generateLink":
      break;
    case "sendMsg":
      break;
    default:
      break;
  }
});
