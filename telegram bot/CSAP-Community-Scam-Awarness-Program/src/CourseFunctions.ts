import { JsonValue } from "@prisma/client/runtime/library";
import { prisma } from "./ScamBase";
import { Prisma } from "@prisma/client";


export type LessonType = {
    title: string,
    description: string,
    Question:
    {
        question: string,
        answer: string,
        choice: string[],
    }

}

type CourseType = {
    title: string,
    description: string,
    contents: JsonValue[],


}

export async function CreateCourse(title: string, description: string) {
    const course = await prisma.course.create({
        data: {
            title,
            description,
        }
    }).catch((error) => { console.log(error.message); });
    if (!course) return "Couldn't create the Course";
    return "course created successfuly";
}

export async function getAllCourses() {
    const courses = await prisma.course.findMany({ include: { content: true } })
        .catch((error) => { console.log(error.message); return [] });
    return courses;
}
export async function getCourse(courseTitle: string) {
    const course = await prisma.course.findUnique({ where: { title: courseTitle }, include: { content: true, } })
        .catch((error) => {
            console.log(error.message);
        });

    return course;
}


export async function updateCourse(courseTitle: string, data: CourseType) {
    const course = await prisma.course.update({ where: { title: courseTitle }, data })
        .catch((error) => { console.log(error.message); return error.message });

    return course;
}

export async function createLesson(courseTitle: string, data: LessonType) {
    const course = await prisma.course.findUnique({ where: { title: courseTitle } })
        .catch(error => { console.log(error.message); return "lesson already existed"; });

    const lesson = await prisma.lesson.create({
        data: {
            title: data.title, description: data.description, Question: { create: data.Question },
        }
    }).catch((error) => { console.log(error.message); return error.message });

    return "lesson created successfuly";

}

export async function createQuestion(lessonTitle: string, data: LessonType["Question"]) {

    const lesson = await prisma.lesson.update({
        where: { title: lessonTitle }, data: {
            Question: { create: data }
        }
    }).catch(error => {
        console.log(error.message);
        return "error saving question " + error.message
    });
    return "questions successfuly created";
}

export async function getLessonsFromCourse(courseTitle: string) {
    const course = await prisma.course.findUnique({ where: { title: courseTitle } })
        .catch((error) => { console.log(error.message); return error.message; });
    return course;
}

export async function getLessonCount(courseTitle: string) {
    const course = await prisma.course.findUnique({
        where: { title: courseTitle },
        include: { content: true }
    })
        .catch((error) => { console.log(error.message); return error.message });
    return course?.content.length;
}
