import { prisma } from "@/server/database/db";
import type { Prisma } from "@prisma/client";
import { type } from "os";

/**
 * The TagWithRelations type represents a tag with its related data, including strains.
    */

export type TagWithRelations = Prisma.TerpTagGetPayload<{
    include: {
        Strains: true;
    };
}>;

/**
 * The TagWithNoRelations type represents a tag with no related data.
 * This is useful for creating new tags and tag lists.
    */

export type TagWithNoRelations = Prisma.TerpTagGetPayload<{}>;

// function to get all tags

export async function getAllTags(): Promise<TagWithNoRelations[]> {

    const tags = await prisma.terpTag.findMany();
    return tags;
}
