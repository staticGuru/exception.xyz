import React from "react";
import Link from "next/link";

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<{}>;
    };
  };
}

interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}

export default function ArticleSelect({
  categories,
  articles,
  params,
}: {
  categories: Category[];
  articles: Article[];
  params: {
    slug: string;
    category: string;
  };
}) {
  return (
    <div className="p-4 rounded-lg dark:bg-gray-900 min-h-[365px] sticky top-[15%]">
      <div>
        <div className="space-y-2">
          <h4 className="text-lg font-semibold">Other Posts You May Like</h4>
          <ul className="ml-4 space-y-1 list-disc">
            {articles.map((article: Article) => {
              return (
                <li>
                  <Link
                    rel="noopener noreferrer"
                    href={`/blog/${params.category}/${article.attributes.slug}`}
                    className={`${
                      params.slug === article.attributes.slug &&
                      "text-pink-400"
                    }  hover:underline hover:text-pink-300 transition-colors duration-200`}
                  >
                    {article.attributes.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
