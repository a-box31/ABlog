import Link from "next/link";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  authorName: string;
  createdAt: string;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  authorName,
  createdAt,
}: BlogCardProps) {
  return (
    <article className="blog-card">
      <Link href={`/blog/${slug}`} className="blog-card__link">
        <h2 className="blog-card__title">{title}</h2>
        <p className="blog-card__excerpt">
          {excerpt || "No preview available."}
        </p>
        <div className="blog-card__meta">
          <span className="blog-card__author">{authorName}</span>
          <span className="blog-card__date">
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </Link>
    </article>
  );
}
