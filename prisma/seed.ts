/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding...");
    await prisma.$connect();

    await prisma.user.deleteMany({});
    //await prisma.survey.deleteMany({});
    //await prisma.question.deleteMany({});

    //Users
    await prisma.user.create({
        data: {
            username: "root",
            email: "root@mail.com",
            password: "123"
        },
    });

    await prisma.user.create({
        data : {
            username:"user1",
            email:"user1@mail.com",
            password:"123"
        }
    });

    /* //Surveys
    await prisma.survey.create({
        data: {
            title: "Anket1",
            published: true,
        }
    });

    //Question
    await prisma.question.create({
        data: {
            question: "Soru1",
            answer: "Cevap1"
        }    
    }); */
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });