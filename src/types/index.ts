import {Bug, ProjectRole} from "@prisma/client";

export type Id = string | number;

export type Column = {
    id: Id;
    title: string;
};

export type Task = {
    id: Id;
    columnId: Id;
    content: string;
};

export interface IMember {
    user: {
        name: string | null, image: string | null
    }
    id: number,
    user_id: number,
    project_id: number,
    role: ProjectRole
}

export interface IBug extends Bug {
    developer: {
        name: string
        image?: string
    },
    reporter: {
        name: string,
        image?: string
    },
    column: {
        name: string
    }
    comments: {
        body: string
        created_at: Date
        user: {
            name: string
            image?: string
        }
    }[]
}