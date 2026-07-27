import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-[#1a1a1a] mt-10 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-bold tracking-wide text-[#1a1a1a] mt-10 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold text-[#1a1a1a] mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-base text-[#3a3a3a] leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside flex flex-col gap-1 mb-4 text-[#3a3a3a]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside flex flex-col gap-1 mb-4 text-[#3a3a3a]">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-base leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#1a1a1a]">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-700 hover:underline underline-offset-4"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-10 border-gray-200" />,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-200 pl-4 italic text-gray-600 my-4">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => (
    <code
      className={`rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-[#1a1a1a] ${className ?? ""}`}
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-gray-100 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mb-4 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-gray-200 bg-gray-50 p-3 font-semibold text-[#1a1a1a]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-gray-100 p-3 text-[#3a3a3a]">
      {children}
    </td>
  ),
};

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="flex flex-col">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
