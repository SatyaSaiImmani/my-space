import { readFile } from "fs/promises";
import path from "path";

export interface ArticleMeta {
  id: string;
  title: string;
  description: string;
  postedDate: string;
  filename: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");

const articles: ArticleMeta[] = [
  {
    id: "centos-dual-boot-windows",
    title:
      "Turning a SanDisk Extreme SSD Into a Portable CentOS Stream 10 Workstation - A PXE Boot War Story",
    description:
      "A casual Sunday-night idea to PXE-boot a CentOS Stream 10 installer from a MacBook turned into an all-night troubleshooting marathon — dnsmasq, Secure Boot, TFTP permissions, and a stalled install, one problem at a time.",
    postedDate: "2026-07-27",
    filename: "centos-dual-boot-windows.md",
  },
];

export function getArticles(): ArticleMeta[] {
  return articles;
}

export function getArticleMeta(id: string): ArticleMeta | undefined {
  return articles.find((article) => article.id === id);
}

export async function getArticleContent(id: string): Promise<string> {
  const article = getArticleMeta(id);
  if (!article) {
    throw new Error(`No article found for id "${id}"`);
  }
  return readFile(path.join(CONTENT_DIR, article.filename), "utf-8");
}

export function formatArticleDate(postedDate: string): string {
  return new Date(postedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
