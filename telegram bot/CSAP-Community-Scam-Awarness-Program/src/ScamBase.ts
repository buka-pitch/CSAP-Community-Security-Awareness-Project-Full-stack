import { PrismaClient } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import axios from "axios";
import { Context } from "telegraf";
import { Contact } from "telegraf/types";

export const prisma = new PrismaClient();

type UserResponseType = {
  id: string;
  chatId: number;
  Rateing: number;
  data: JsonValue[];
  Name: string;
  createdAt: Date;
  lastSeen: Date;
  courseId: string | null;
} | null;

type AdminResponseType = {
  id: string;
  chatId: number;
  email: string;
  fullName: string;
  Rateing: number;
  data: JsonValue;
};

export async function SaveSession(
  chatId: number,
  FullName: string
): Promise<UserResponseType> {
  const userExist = await prisma.users
    .findUnique({
      where: {
        chatId,
      },
    })
    .catch((err: any) => {
      console.log(err.message);
    });

  if (userExist?.chatId) {
    return userExist;
  }

  const User = await prisma.users
    .create({
      data: { chatId, Name: FullName },
    })
    .catch((err) => {
      console.log(err.message);
    });

  if (User?.chatId) {
    console.log("new user saved " + User.Name);
    return User;
  }

  return null;
}

export async function AdminCheck(chatId: number): Promise<boolean> {
  try {
    const isAdmin = await prisma.admin.findUnique({
      where: { chatId: chatId },
    });

    if (isAdmin?.id) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
}

export async function CreateAdmin(
  chatId: number,
  telegramName: string,
  role: string,
  email: string
): Promise<string> {
  try {
    const admin = await prisma.admin.findUnique({ where: { chatId } });
    if (!admin?.id) return "you are Unauthorized!";
    const user = await prisma.users
      .findFirst({
        where: { Name: telegramName },
      })
      .catch((error) => {
        throw new Error("User not Found!");
      });

    if (!user?.id) throw new Error("User Not Found!");

    const createdAdmin = await prisma.admin.create({
      data: {
        chatId: user.chatId,
        fullName: telegramName,
        email,
        role,
      },
    });

    return `Admin ${telegramName} created Successfuly`;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
}

export async function getAllUsersChatId() {
  const chatIds = await prisma.users.findMany();

  return chatIds;
}

export async function CountUser(): Promise<number> {
  const user = await prisma.users.count();
  return user;
}

export function GenerateBotScamLink(
  linklabel: string,
  botUsername: string
): string {
  let link = `https://t.me/${botUsername}?start=${botUsername}`;
  return link;
}

export function GenerateBitLyLink(
  label: string,
  botUsername: string,
  cxt: Context
) {
  //generate a bit.ly link here;
}
