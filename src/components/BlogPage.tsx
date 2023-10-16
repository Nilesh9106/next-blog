"use client"
import { IBlog } from "@/models/Blog";
import { useEffect, useState } from "react"
import {
    RedditShareButton,
    RedditIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
} from 'next-share'

import TimeAgo from 'react-timeago'


import Prism from "prismjs";
import '#/prism.css'
import "prismjs/plugins/line-numbers/prism-line-numbers.css"
import "prismjs/plugins/line-numbers/prism-line-numbers"
import "prismjs/plugins/toolbar/prism-toolbar"
import "prismjs/plugins/toolbar/prism-toolbar.css"
import "prismjs/plugins/show-language/prism-show-language"
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard"

import { getBlog } from "@/services/blogService";
import Loading from "./Loading";

export default function BlogPage({ slug }: { slug: string }) {
    const [blog, setBlog] = useState<IBlog | null>(null);



    useEffect(() => {
        (async () => {
            try {
                let blog = await getBlog(slug);
                setBlog(blog);
                setTimeout(() => {
                    let codes = document.querySelectorAll("pre > code");
                    for (let i = 0; i < codes.length; i++) {
                        const element = codes[i];
                        element.classList.add('line-numbers')
                    }
                    Prism.highlightAll();
                }, 500);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [slug]);

    return (
        <>
            {
                blog === null ?
                    <Loading /> :
                    <article className="px-4 md:py-24 py-10 mx-auto max-w-7xl" itemScope itemType="http://schema.org/BlogPosting">
                        <div className="max-w-full mx-auto  mb-10 lg:max-w-3xl md:max-w-2xl sm:max-w-xl">
                            <div className="pb-6 mb-6 border-b border-gray-200 dark:border-gray-700 ">
                                <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-gray-200 md:leading-tight md:text-4xl" itemProp="headline" title={blog?.title}>
                                    {blog?.title}
                                </h1>
                                <p className="text-base text-gray-500 capitalize dark:text-gray-300">
                                    <TimeAgo date={blog.createdAt as string} />
                                </p>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-200 mb-6 space-x-2">
                                <p className="">Share this article on</p>
                                <TwitterShareButton
                                    url={`https://nileshblogs.vercel.app/blog/${blog.slug}`}
                                    title={`CheckOut This Amazing Blog about ${blog.title} posted by Nilesh Darji`}
                                    hashtags={["#NileshBlogs", "#blog"]}
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>
                                <WhatsappShareButton
                                    url={`https://nileshblogs.vercel.app/blog/${blog.slug}`}
                                    title={`CheckOut This Amazing Blog about ${blog.title} posted by Nilesh Darji`}
                                >
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                                <RedditShareButton
                                    url={`https://nileshblogs.vercel.app/blog/${blog.slug}`}
                                    title={`CheckOut This Amazing Blog about ${blog.title} posted by Nilesh Darji`}
                                >
                                    <RedditIcon size={32} round />
                                </RedditShareButton>

                            </div>

                            <img src={blog?.image} className="object-cover hover:opacity-80 transition-all w-full  bg-center rounded" alt={blog?.title} />
                        </div>

                        {blog?.content && <div className="max-w-full mx-auto  lg:max-w-3xl md:max-w-2xl sm:max-w-xl prose sm:prose-sm md:prose-lg lg:prose-xl   prose-pre:!bg-zinc-900   prose-violet prose-pre:shadow-lg dark:prose-invert" dangerouslySetInnerHTML={{ __html: blog.content }}></div>}

                    </article>
            }
        </>
    )
}
