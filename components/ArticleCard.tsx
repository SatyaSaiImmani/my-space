import Link from "next/link";
import { formatArticleDate, type ArticleMeta } from "@/lib/articles";

export default function ArticleCard({
  id,
  title,
  description,
  postedDate,
}: ArticleMeta) {
  return (
    <Link
      href={`/articles/${id}`}
      className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-green-700/40"
    >
      <p className="text-xs font-semibold tracking-widest uppercase text-gray-400">
        {formatArticleDate(postedDate)}
      </p>
      <h3 className="text-xl font-bold text-[#1a1a1a]">{title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      <span className="mt-2 text-sm text-green-700">Read more &rarr;</span>
    </Link>
  );
}
