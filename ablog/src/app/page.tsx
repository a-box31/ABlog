"use client";

import { useState, useEffect, useCallback } from "react";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  authorName: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async (query?: string) => {
    setLoading(true);
    try {
      const url = query
        ? `/api/posts?q=${encodeURIComponent(query)}`
        : "/api/posts";
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleSearch = useCallback(
    (query: string) => {
      fetchPosts(query);
    },
    [fetchPosts],
  );

  return (
    <main className="home">
      <section className="home__hero">
        <h1>
          Welcome to <span className="home__brand">ABlog</span>
        </h1>
        <p>Discover stories, ideas, and expertise from writers on any topic.</p>
        <SearchBar onSearch={handleSearch} />
      </section>

      <section className="home__posts">
        {loading ? (
          <div className="home__loading">
            <div className="spinner" />
            <p>Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="home__empty">
            <p>No posts found. Be the first to write one!</p>
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
