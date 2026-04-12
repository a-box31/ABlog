import { db } from "@/db";
import { postsTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import MarkdownPreview from "@/components/MarkdownPreview";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [post] = await db
    .select({
      id: postsTable.id,
      title: postsTable.title,
      content: postsTable.content,
      authorName: usersTable.name,
      createdAt: postsTable.createdAt,
      updatedAt: postsTable.updatedAt,
    })
    .from(postsTable)
    .innerJoin(usersTable, eq(postsTable.authorId, usersTable.id))
    .where(eq(postsTable.slug, slug));

  if (!post) {
    notFound();
  }

  return (
    <main className="blog-post">
      <article className="blog-post__article">
        <header className="blog-post__header">
          <h1>{post.title}</h1>
          <div className="blog-post__meta">
            <span>By {post.authorName}</span>
            <time>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </header>
        <div className="blog-post__content">
          <MarkdownPreview content={post.content} />
        </div>
      </article>
      <Link href="/" className="blog-post__back">
        &larr; Back to all posts
      </Link>
    </main>
  );
}
