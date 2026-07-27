import type { Metadata } from "next";
import { getArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Articles | Sri Satya Sai Immani",
  description:
    "Write-ups on the systems, infrastructure, and debugging deep-dives Sri Satya Sai Immani works through.",
};

export default function ArticlesPage() {
  const articles = getArticles();

  return (
    <section className="min-h-screen w-full flex flex-col">
      <div className="px-12 md:px-24 lg:px-32 py-20 flex flex-col gap-10">
        <div>
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">
            ARTICLES
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest text-[#1a1a1a]">
            WRITE-UPS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
