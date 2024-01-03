//TODO
//create a scene for every function to create or manage the program as admin
//create a dynamic scene to render the course lesson and questions
//-->
//

import { MyContext, MyWizardSession } from "../app";
import { Scenes, Telegraf, session, Context, Composer, Markup } from "telegraf";
import { BaseScene, Stage, WizardScene } from "telegraf/scenes";
import { InlineKeyboardButton, Update } from "telegraf/types";
import { LessonType, getAllCourses, getCourse } from "../CourseFunctions";
import { prisma } from "../ScamBase";
import { GenerateCertificate } from "../cert";
import { NextFunction } from "express";
import { stringify } from "uuid";
import { Question } from "@prisma/client";

export type ButtonType = { text: string; callback_data: string; hide: false }[];

export const CompleteLessonScene = new BaseScene<MyContext>(
  "CompleteLessonScene"
);

CompleteLessonScene.enter(async (cxt: MyContext, next: NextFunction) => {
  const courses = await getAllCourses();
  let button: ButtonType = [{ text: "", callback_data: "0", hide: false }];
  let inlinekeyboard = courses.forEach((item, index) => {
    return button.push({
      text: item.title,
      callback_data: item.id.toString(),
      hide: false,
    });
  });

  let cert = await GenerateCertificate(
    cxt.from.first_name + cxt.from.last_name,
    cxt.session.courseTitle
  );
  cxt.sendChatAction("upload_document");
  await cxt.sendDocument(
    { filename: "csap certificate.pdf", source: cert },
    { caption: "your csap certificate" }
  );
  await cxt.replyWithMarkdown(
    "***You have successfuly completed this lesson***\n``` You can choose your next Concept to continue.```\n",
    Markup.inlineKeyboard(button, { columns: 1 })
  );

  await cxt.sendMessage(
    "-",
    Markup.keyboard(["back to Home"]).resize(true).oneTime(true)
  );
});

CompleteLessonScene.hears("back to Home", async (cxt: MyContext, next) => {
  cxt.deleteMessage();
  cxt.scene.leave();
  cxt.scene.enter("BaseUserScene");
});

CompleteLessonScene.on("callback_query", async (cxt, next) => {
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
});

export const ViewLesson = new BaseScene<MyContext>("ViewLessonScene");
ViewLesson.enter(async (cxt: MyContext, next: NextFunction) => {
  if (await cxt.session.lessonTitle) {
    const { lessonTitle, courseId } = await cxt.session;
    const lessons = await prisma.lesson
      .findUnique({
        where: { title: lessonTitle, courseId: courseId },
        include: { Question: true },
      })
      .catch((error) => {
        console.error(error.message);
        console.log("no lesson found with " + lessonTitle);
      });

    await cxt.replyWithMarkdownV2(
      "``` " + lessons?.title + "\n\n" + lessons?.description + " ```",
      Markup.keyboard(["Next", "Quit"]).resize(true).oneTime(true)
    );

    // rendering question if any
    if (lessons?.Question && lessons?.Question?.length > 0) {
      let questions: Question[] = [];
      lessons?.Question.map(async (question) => {
        let correct_answer = question.choice.indexOf(question.answer);

        return await cxt.sendQuiz(question.question, question.choice, {
          explanation: question.explanation || "",
          allows_multiple_answers: false,
          is_anonymous: false,
          correct_option_id: correct_answer,
        });
      });
    }
  } else {
    console.log("no title found : ", cxt.session.lessonTitle);
    next();
  }
});

ViewLesson.on("callback_query", async (cxt, next) => {
  if ((await cxt.update.callback_query.data) === "Next") {
    cxt.deleteMessage();
    console.log(`lesson ${cxt.session.lessonTitle}`);
    cxt.scene.enter("LessonScene");
  } else {
    console.log(cxt.callbackQuery.data);
  }
});

ViewLesson.hears("back to Home", async (cxt: MyContext, next) => {
  cxt.deleteMessage();
  cxt.scene.leave();
  cxt.scene.enter("BaseUserScene");
});

ViewLesson.hears("Next", async (cxt, next) => {
  await cxt.deleteMessage();

  cxt.scene.enter("LessonScene");
});

ViewLesson.hears("Quit", async (cxt, next) => {
  cxt.deleteMessage();
  cxt.scene.enter("BaseUserScene");
});

export const LessonScene = new WizardScene<MyContext>(
  "LessonScene",
  async (cxt: MyContext, next: NextFunction) => {
    let { lessonIndex } = cxt.session;
    if (lessonIndex == undefined || lessonIndex == null) {
      cxt.session.lessonIndex = 0;
      lessonIndex = 0;
    } else if (lessonIndex || lessonIndex == 0) {
      cxt.session.lessonIndex += 1;
      lessonIndex += 1;
    } else {
      cxt.session.lessonIndex += 1;
      lessonIndex += 1;
    }
    console.log(`Lesson scene ` + cxt.session.lessonTitle);
    console.debug("lindex", await cxt.session.lessonIndex, lessonIndex);

    if (await cxt.session.lessonTitle) {
      let { courseIndex } = await cxt.session;
      let courses = await getAllCourses();
      cxt.session.courseTitle = courses[courseIndex].title;
      let lessonLength = courses[courseIndex].content.length;

      if (lessonIndex >= lessonLength) {
        return cxt.scene.enter("CompleteLessonScene");
      } else {
        let Ctitle = courses[courseIndex].content[lessonIndex].title;
        cxt.session.lessonTitle = Ctitle;
        cxt.scene.enter("ViewLessonScene");
      }
    } else {
      let initial = 0;
      cxt.session.courseIndex = 0;
      let courses = await getAllCourses();
      let CourseId = courses[0].id;
      cxt.session.courseId = CourseId;
      let Ctitle = courses[0].content[0].title;
      cxt.session.lessonTitle = Ctitle;
      cxt.session.lessonIndex = null;
      cxt.session.newCourse = true;
      cxt.scene.enter("ViewLessonScene");
    }
  }
);

LessonScene.hears(
  "back to Home",
  async (cxt: MyContext, next: NextFunction) => {
    cxt.deleteMessage();
    cxt.scene.leave();
    cxt.scene.enter("BaseUserScene");
  }
);

LessonScene.hears("Next ->", async (cxt: MyContext) => {
  cxt.reply("i can hear you");
  return cxt.wizard.next();
});

LessonScene.hears("Quit", async (cxt: MyContext, next: NextFunction) => {
  cxt.deleteMessage();
  cxt.scene.enter("BaseUserScene");
});
