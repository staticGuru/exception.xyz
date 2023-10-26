"use client";
import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { postRenderer } from "@/app/[lang]/utils/post-renderer";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
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
    blocks: any[];
    publishedAt: string;
  };
}

export default function Post({ data }: { data: Article }) {
  const { title, description, publishedAt, cover, authorsBio } =
    data.attributes;
  const author = authorsBio.data?.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);
  const authorImgUrl = getStrapiMedia(
    authorsBio.data?.attributes.avatar.data.attributes.url
  );


//   useEffect(() => {
//     const progressContainerEl = window
//       ? document.querySelector(".post-container")
//       : null;
//     const progressBarEl = window
//       ? document.querySelector(".progress-bar-container__progress")
//       : null;
//     if (window && progressContainerEl && progressBarEl) {
//       console.log({ progressContainerEl });

//       // function to check scroll position and update scroll progress bar accordingly
//       const updateScrollProgressBar = () => {
//         // get full scroll height
//         const scrollHeight =
//           progressContainerEl.scrollHeight -
//           heightInViewport(progressContainerEl);
//         console.log(scrollHeight);
//         // get current scroll position
//         const scrollPosition = progressContainerEl.scrollTop;

//         // get scroll percentage and set width of progress bar
//         const scrollPercentage = (scrollPosition / scrollHeight) * 100;
//         progressBarEl.style.width = scrollPercentage + "%";
//       };

//       // bind window onload and onscroll events to update scroll progress bar width
//       progressContainerEl.addEventListener("scroll", updateScrollProgressBar);
//       progressContainerEl.addEventListener("load", updateScrollProgressBar);

//       // function to get visible height in viewport
//       // some code taken from user Roko C. Buljan on https://stackoverflow.com/questions/24768795/get-the-visible-height-of-a-div-with-jquery
//       function heightInViewport(el) {
//         var elH = el.offsetHeight,
//           H = document.body.offsetHeight,
//           r = el.getBoundingClientRect(),
//           t = r.top,
//           b = r.bottom;
//         return Math.max(0, t > 0 ? Math.min(elH, H - t) : Math.min(b, H));
//       }
//     }
//   }, [window]);

  return (
    <article className="space-y-8 dark:bg-black dark:text-gray-50">
      {/* <div className="progress-bar-container">
        <div className="progress-bar-container__progress"></div>
      </div> */}
      
      <div className="space-y-6">
        <h1 className="leading-tight text-5xl font-bold ">{title}</h1>

        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
          <div className="flex items-center md:space-x-2">
            {authorImgUrl && (
              <Image
                src={authorImgUrl}
                alt="article cover image"
                width={400}
                height={400}
                className="w-14 h-14 border rounded-full dark:bg-gray-500 dark:border-gray-700"
              />
            )}
            <p className="text-md dark:text-violet-400">
              {author && author.name} • {formatDate(publishedAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="dark:text-gray-100">
        <p className="pb-6">{description}</p>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="article cover image"
            width={400}
            height={400}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
        {data.attributes.blocks.map((section: any, index: number) =>
          postRenderer(section, index)
        )}
      </div>
    </article>
  );
}
