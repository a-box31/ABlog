"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import MarkdownPreview from "@/components/MarkdownPreview";

type Tab = "write" | "preview";

const TOOLBAR_ACTIONS = [
  { label: "B", title: "Bold", prefix: "**", suffix: "**", placeholder: "bold text" },
  { label: "I", title: "Italic", prefix: "_", suffix: "_", placeholder: "italic text" },
  { label: "H1", title: "Heading 1", prefix: "# ", suffix: "", placeholder: "Heading" },
  { label: "H2", title: "Heading 2", prefix: "## ", suffix: "", placeholder: "Heading" },
  { label: "H3", title: "Heading 3", prefix: "### ", suffix: "", placeholder: "Heading" },
  { label: "~~", title: "Strikethrough", prefix: "~~", suffix: "~~", placeholder: "strikethrough" },
  { label: "`", title: "Inline code", prefix: "`", suffix: "`", placeholder: "code" },
  { label: "```", title: "Code block", prefix: "```\n", suffix: "\n```", placeholder: "code" },
  { label: ">", title: "Blockquote", prefix: "> ", suffix: "", placeholder: "quote" },
  { label: "Link", title: "Link", prefix: "[", suffix: "](url)", placeholder: "link text" },
  { label: "UL", title: "Unordered list", prefix: "- ", suffix: "", placeholder: "list item" },
  { label: "OL", title: "Ordered list", prefix: "1. ", suffix: "", placeholder: "list item" },
  { label: "HR", title: "Horizontal rule", prefix: "\n---\n", suffix: "", placeholder: "" },
];

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const insertMarkdown = (prefix: string, suffix: string, placeholder: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.substring(start, end);
    const insertion = selected || placeholder;
    const newText = content.substring(0, start) + prefix + insertion + suffix + content.substring(end);

    setContent(newText);

    requestAnimationFrame(() => {
      textarea.focus();
      const cursorStart = start + prefix.length;
      const cursorEnd = cursorStart + insertion.length;
      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = content.substring(0, start) + "  " + content.substring(end);
      setContent(newText);
      requestAnimationFrame(() => {
        textarea.setSelectionRange(start + 2, start + 2);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, excerpt: excerpt || undefined }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create post");
        return;
      }

      router.push(`/blog/${data.post.slug}`);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-post">
      <h1>Write a New Post</h1>

      {error && <div className="auth__error">{error}</div>}

      <form onSubmit={handleSubmit} className="create-post__form">
        <div className="auth__field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Give your post a title"
          />
        </div>
        <div className="auth__field">
          <label htmlFor="excerpt">Excerpt (optional)</label>
          <input
            id="excerpt"
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="A short summary of your post"
          />
        </div>

        <div className="md-editor">
          <div className="md-editor__tabs">
            <button
              type="button"
              className={`md-editor__tab ${activeTab === "write" ? "md-editor__tab--active" : ""}`}
              onClick={() => setActiveTab("write")}
            >
              Write
            </button>
            <button
              type="button"
              className={`md-editor__tab ${activeTab === "preview" ? "md-editor__tab--active" : ""}`}
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </button>
          </div>

          {activeTab === "write" && (
            <div className="md-editor__toolbar">
              {TOOLBAR_ACTIONS.map((action) => (
                <button
                  key={action.title}
                  type="button"
                  title={action.title}
                  className="md-editor__tool"
                  onClick={() => insertMarkdown(action.prefix, action.suffix, action.placeholder)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {activeTab === "write" ? (
            <textarea
              ref={textareaRef}
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              required
              rows={20}
              placeholder="Write your post in Markdown..."
              className="md-editor__textarea"
            />
          ) : (
            <div className="md-editor__preview">
              {content ? (
                <MarkdownPreview content={content} />
              ) : (
                <p className="md-editor__empty">Nothing to preview yet. Start writing!</p>
              )}
            </div>
          )}
        </div>

        <button type="submit" className="auth__submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </main>
  );
}
