"use client";
import { IBlog } from "@/models/Blog";
import React, { useEffect, useRef, useState } from "react";
import {
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import TimeAgo from "react-timeago";
import Prism from "prismjs";
import "#/prism.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/toolbar/prism-toolbar";
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/show-language/prism-show-language";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
import Loading from "./Loading";
import { BlogService } from "@/services/blogService";
import { BlogTypeWithComments } from "@/types/models";
import { BiComment, BiHeart, BiLike, BiLoader, BiShare } from "react-icons/bi";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";
import Link from "next/link";

function isElementInViewport(element: HTMLElement) {
  var rect = element.getBoundingClientRect();

  return (
    rect.bottom < 0 ||
    rect.right < 0 ||
    rect.left > window.innerWidth ||
    rect.top > window.innerHeight
  );
}

export default function BlogPage({ slug }: { slug: string }) {
  const [blog, setBlog] = useState<BlogTypeWithComments>();
  const element = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [comment, setComment] = useState<string>("");
  const { user } = useAuth();

  const handleLike = async () => {
    if (!user) {
      toast.error("Please Login to Like the Blog");
      return;
    }
    if (likeLoading) return;
    setLikeLoading(true);
    if (blog?.likedBy?.includes(user?.id!)) {
      const updatedBlog = await BlogService.unlikeBlog(slug);
      setBlog({ ...blog, likedBy: updatedBlog?.likedBy });
      return;
    } else if (blog) {
      const updatedBlog = await BlogService.likeBlog(slug);
      setBlog({ ...blog, likedBy: updatedBlog?.likedBy });
    }
    setLikeLoading(false);
  };
  const handleComment = async () => {
    if (!user) {
      toast.error("Please Login to Comment on the Blog");
      return;
    }
    if (commentLoading) return;
    setCommentLoading(true);
    const res = await BlogService.commentOnBlog(slug, comment);
    if (res) {
      setBlog(res);
      setComment("");
      toast.success("Comment Added Successfully");
    }
    setCommentLoading(false);
  };

  useEffect(() => {
    (async () => {
      const blog = await BlogService.getBlogBySlug(slug);
      setBlog(blog);
      setTimeout(() => {
        let codes = document.querySelectorAll("pre > code");
        for (let i = 0; i < codes.length; i++) {
          const element = codes[i];
          element.classList.add("line-numbers");
        }
        Prism.highlightAll();
      }, 500);
    })();
  }, [slug]);
  useEffect(() => {
    function handleScroll() {
      if (element.current) {
        setIsVisible(isElementInViewport(element.current));
      }
    }
    window.addEventListener("scroll", handleScroll);
  }, [isVisible, element]);

  return (
    <>
      {!blog ? (
        <Loading />
      ) : (
        <>
          <article
            className="px-4 md:py-24 py-10 mx-auto max-w-7xl"
            itemScope
            itemType="http://schema.org/BlogPosting"
          >
            <div
              ref={element}
              className="max-w-full mx-auto  mb-10 lg:max-w-3xl md:max-w-2xl sm:max-w-xl"
            >
              <div className="pb-6 mb-6 border-b border-gray-200 dark:border-gray-700 ">
                <h1
                  className="mb-3 text-3xl font-bold text-gray-900 dark:text-gray-200 md:leading-tight md:text-4xl"
                  itemProp="headline"
                  title={blog?.title}
                >
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

              <img
                src={blog?.image}
                className="object-cover hover:opacity-80 transition-all w-full  bg-center rounded"
                alt={blog?.title}
              />
            </div>

            {blog?.content && (
              <div
                className="max-w-full mx-auto  lg:max-w-3xl md:max-w-2xl sm:max-w-xl prose sm:prose-sm md:prose-lg lg:prose-xl   prose-pre:!bg-zinc-900   prose-emerald prose-pre:shadow-lg dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              ></div>
            )}
            <div
              id="comments"
              className="max-w-full mx-auto  mb-10 mt-16 lg:max-w-3xl md:max-w-2xl sm:max-w-xl"
            >
              <div>
                <textarea
                  name=""
                  id=""
                  cols={30}
                  className="input"
                  rows={4}
                  placeholder="Write your comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                  className="btn flex gap-3"
                  onClick={handleComment}
                  disabled={commentLoading}
                >
                  <BiLoader
                    className={`${
                      commentLoading ? "animate-spin text-2xl" : "hidden"
                    }`}
                  />
                  Comment
                </button>
              </div>
              <h3 className="text-3xl mt-6">Comments</h3>
              <div className="w-16 h-2 rounded-md my-2 bg-emerald-400"></div>
              <div className="flex flex-col gap-4 mt-10">
                {blog?.comments?.map((comment) => (
                  <div
                    key={comment._id}
                    className="p-4 dark:bg-neutral-900 bg-neutral-300 rounded-lg"
                  >
                    <h4 className="text-lg underline underline-offset-3">
                      @{comment.user.username}
                    </h4>
                    <p>{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </>
      )}
      <div
        className={`${
          !isVisible ? "-bottom-24" : ""
        } fixed  h-16 flex justify-center items-center px-8 mb-7 bottom-0 left-1/2 -translate-x-1/2 bg-emerald-600/60 backdrop-blur-lg  shadow-lg rounded-lg z-50 transition-all`}
      >
        <div className="flex gap-8">
          <button
            onClick={() => {
              handleLike();
            }}
            className="flex flex-col items-center justify-center"
          >
            {likeLoading ? (
              <BiLoader className="animate-spin text-3xl" />
            ) : (
              <BiHeart
                className={`text-3xl ${
                  blog?.likedBy?.includes(user?.id!) ? "text-red-500" : ""
                }`}
              />
            )}
            <span className="text-sm">{blog?.likedBy?.length ?? 0}</span>
          </button>
          <Link
            href={"#comments"}
            scroll={true}
            className="flex flex-col items-center justify-center"
          >
            <BiComment className="text-3xl" />
            <span className="text-sm">{blog?.comments?.length ?? 0}</span>
          </Link>
        </div>
      </div>
    </>
  );
}
