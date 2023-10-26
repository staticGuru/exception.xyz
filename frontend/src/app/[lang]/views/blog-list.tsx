"use client";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";
import { useCallback, useEffect, useState } from "react";
import { fetchAPI } from "../utils/fetch-api";
import { ALL_TOPICS } from "@/app/constants";

interface Article {
  id: 4;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

interface Topics {
  attributes: {
    name: string;
    slug: string;
    articles: {
      data: Array<any>[];
    };
  };
}

export default function PostList({
  data: articles,
  selectedTopic,
  children,
}: {
  data: Article[];
  selectedTopic:string;
  children?: React.ReactNode;
}) {
  const [relatedData, setRelatedData] = useState<Topics[]>([]);
  const fetchCategories = useCallback(async () => {
    const relatedPath = "/categories";
    const urlParamsObject = {
      populate: "*",
    };
    const options = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    };
    const responseData = await fetchAPI(relatedPath, urlParamsObject, options);
    setRelatedData(responseData.data);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);
  function selectedTopics(current: string) {
    return current === selectedTopic
      ? "m-1 bg-slate-500 text-base font-normal rounded-full px-4 py-2 text-white font-semibold"
      : "m-1 bg-slate-100 text-base font-normal rounded-full px-4 py-2 hover:bg-slate-300";
  }
  return (
    <section className="container w-full p-6 space-y-6 sm:space-y-12">
      <div className="grid px-2 justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        <div className="flex flex-col col-span-2 overflow-y-auto">
          {articles.map((article) => {
            const imageUrl = getStrapiMedia(
              article.attributes.cover.data?.attributes.url
            );

            const category = article.attributes.category.data?.attributes;
            const authorsBio = article.attributes.authorsBio.data?.attributes;

            const avatarUrl = getStrapiMedia(
              authorsBio?.avatar.data.attributes.url
            );

            return (
              <Link
                href={`/blog/${category?.slug}/${article.attributes.slug}`}
                key={article.id}
                className="flex justify-between mb-5 px-3 last:mb-0 hover:bg-gray-50"
              >
                <div className="flex flex-col w-[75%] float-left justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {avatarUrl && (
                        <Image
                          alt="avatar"
                          width="40"
                          height="40"
                          src={avatarUrl}
                          className="rounded-full h-8 w-8 object-cover"
                        />
                      )}
                      {authorsBio && (
                        <span className="text-sm font-semibold dark:text-gray-400">
                          {authorsBio.name}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold group-hover:underline group-focus:underline">
                      {article.attributes.title}
                    </h3>
                    <p className="py-1 text-base font-light text-slate-600">
                      {article.attributes.description}
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-3">
                    <span className="text-sm dark:text-gray-400">
                      {formatDate(article.attributes.publishedAt)}
                    </span>
                    <Link
                      href={`/blog/${article.attributes.category.data.attributes.name}`}
                      className="text-base dark:text-gray-400 text-gray-500 px-3 py-1 rounded-full bg-slate-200"
                    >
                      {article.attributes.category.data.attributes.name}
                    </Link>
                  </div>
                </div>
                {imageUrl && (
                  <Image
                    alt="presentation"
                    width="200"
                    height="134"
                    className="object-cover w-54 h-44 rounded-md "
                    src={imageUrl}
                  />
                )}
              </Link>
            );
          })}
        </div>
        <div className="relative">
          <div className="sticky top-[15%]">
            <p>Explore Topics</p>
            <div className="flex flex-wrap mt-2">
              <Link
                href={`/blog`}
                className={selectedTopics(ALL_TOPICS)}
                >
                {ALL_TOPICS}
              </Link>
              {relatedData.map((topic) => {
                let topicName = topic.attributes.name;
                let slug = topic.attributes.slug;
                if (topic.attributes.articles.data.length === 0) return null;
                return (
                  <Link
                    href={`/blog/${slug}`}
                    className={selectedTopics(slug)}
                  >
                    {topicName}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {children && children}
    </section>
  );
}
