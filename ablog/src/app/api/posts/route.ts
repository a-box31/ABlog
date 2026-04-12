import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { postsTable, usersTable } from "@/db/schema";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { eq, desc, ilike, or, and } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    const whereClause = query
      ? and(
          eq(postsTable.published, true),
          or(
            ilike(postsTable.title, `%${query}%`),
            ilike(postsTable.content, `%${query}%`),
          ),
        )
      : eq(postsTable.published, true);

    const posts = await db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        slug: postsTable.slug,
        excerpt: postsTable.excerpt,
        authorId: postsTable.authorId,
        authorName: usersTable.name,
        published: postsTable.published,
        createdAt: postsTable.createdAt,
      })
      .from(postsTable)
      .innerJoin(usersTable, eq(postsTable.authorId, usersTable.id))
      .where(whereClause)
      .orderBy(desc(postsTable.createdAt));

    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, excerpt } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 },
      );
    }

    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Date.now().toString(36);

    const [post] = await db
      .insert(postsTable)
      .values({
        title,
        slug,
        content,
        excerpt: excerpt || content.substring(0, 200),
        authorId: payload.userId,
        published: true,
      })
      .returning();

    return NextResponse.json({ post }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}
