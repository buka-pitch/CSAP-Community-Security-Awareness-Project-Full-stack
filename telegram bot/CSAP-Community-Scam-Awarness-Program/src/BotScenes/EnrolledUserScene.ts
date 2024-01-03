import { MyContext, MyWizardSession } from "../app";
import { Scenes, Telegraf, session, Context, Composer } from "telegraf";
import { BaseScene, Stage, WizardScene } from "telegraf/scenes";
import { InlineKeyboardButton, Update } from "telegraf/types";

const handler = new Composer<MyContext>();

handler.hears("Next ->", async (cxt) => {
  return cxt.wizard.next();
});
export const EnrolledUserScene = new WizardScene<MyContext>(
  "enrolledUserScene",
  async (cxt, next) => {
    return cxt.scene.enter("LessonScene");
  }
);
