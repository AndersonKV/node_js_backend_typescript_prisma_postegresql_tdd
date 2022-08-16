import { prisma } from '../../../prisma';
import { pool } from '../../../config/database'
import { Role } from '@prisma/client';
import { IAuthRepostiry } from '../../implementations/auth/IAuthRepository';




class PrismaAuthRepository implements IAuthRepostiry {

    async authByToken(id: number) {
        const userExist = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!userExist?.id) {
            throw new Error("usuario não encontrado")
        }

        userExist.password = '';
        userExist.confirm_password = '';

        return userExist;

    }

    async sign_in(email: string) {

        const user = await prisma.user.findMany({
            where: {
                email: email
            }
        });


        if (!user.length) {
            throw new Error("email não registrado")
        }

        return user;

    }

    async dashboard(id: number) {

        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                _count: {
                    select: { posts: true, matchings: true }
                },
                matchings: {
                    select: {
                        matchings: {

                        },
                    }
                }

            }
        })

        return user;
    }

    async findPostsAndMatchings(id: number) {

        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {

                posts: {
                    orderBy: {
                        created_at: "desc"
                    },
                    include: {
                        matchings: true,
                    }
                },
                matchings: {
                    orderBy: {
                        created_at: "desc"
                    },
                    include: {
                        job_posted: {

                        }

                    }


                }

            }
        })

        // const user = await prisma.user.findUnique({
        //     //get jobs
        //     where: {
        //         id,
        //     },
        //     include: {
        //         matchings: {
        //             include: {
        //                 job_posted: {}
        //             }
        //         }
        //     },

        // })

        return user;
    }


}

export { PrismaAuthRepository }