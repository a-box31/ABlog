"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BlogCard from "@/components/BlogCard";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  authorId: number;
  authorName: string;
  createdAt: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => r.json()),
      fetch("/api/posts").then((r) => r.json()),
    ]).then(([userData, postsData]) => {
      if (!userData.user) {
        router.push("/auth/login");
        return;
      }
      setUser(userData.user);
      setPosts(
        (postsData.posts || []).filter(
          (p: Post) => p.authorId === userData.user.id,
        ),
      );
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return (
      <main className="profile">
        <div className="home__loading">
          <div className="spinner" />
          <p>Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="profile">
      <div className="profile__header">
        <div className="profile__avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
        <p className="profile__joined">
          Joined{" "}
          {user?.createdAt &&
            new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
        </p>
      </div>

      <section className="profile__posts">
        <h2>Your Posts</h2>
        {posts.length === 0 ? (
          <div className="home__empty">
            <p>You haven&apos;t written any posts yet.</p>
          </div>
        ) : (
          <div className="home__grid">
            {posts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
