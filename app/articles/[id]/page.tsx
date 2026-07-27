import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatArticleDate,
  getArticleContent,
  getArticleMeta,
  getArticles,
} from "@/lib/articles";
import MarkdownContent from "@/components/MarkdownContent";

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getArticles().map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleMeta(id);
  if (!article) return {};

  return {
    title: `${article.title} | Sri Satya Sai Immani`,
    description: article.description,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = getArticleMeta(id);
  if (!article) notFound();

  const rawContent = await getArticleContent(id);
  const content = rawContent.replace(/^#\s+.*\n+/, "");

  return (
    <section className="min-h-screen w-full flex flex-col">
      <div className="px-12 md:px-24 lg:px-32 py-20 max-w-6xl mx-auto w-full">
        <Link
          href="/articles"
          className="text-sm text-green-700 hover:underline underline-offset-4"
        >
          &larr; Back to Articles
        </Link>

        <p className="text-xs tracking-widest text-gray-400 uppercase mt-8 mb-3">
          {formatArticleDate(article.postedDate)}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-widest text-[#1a1a1a] mb-10">
          {article.title}
        </h1>

        <MarkdownContent content={content} />
      </div>
    </section>
  );
}
