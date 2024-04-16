import { BlogType } from "@/types/models";
import Link from "next/link";
import { AiOutlineLink } from "react-icons/ai";

export default function BlogCard({ blog }: { blog: BlogType }) {
  return (
    <div className=" rounded-md shadow-lg border  dark:border-neutral-700 border-gray-300 p-3 bg-neutral-200 dark:bg-neutral-900">
      <div className="relative group">
        <img
          src={blog.image}
          alt={blog.title}
          loading="eager"
          className="aspect-video transition-all duration-300  rounded-md bg-contain group-hover:blur-[2px]"
        />
        <Link
          href={`/blog/${blog.slug}/`}
          className="group-hover:opacity-100 group-hover:scale-110 opacity-0 w-full h-full flex justify-center items-center transition-all duration-300 absolute top-0 right-0"
        >
          <AiOutlineLink className="text-3xl text-white" />
        </Link>
      </div>
      <h3 className="text-lg my-2">{blog.title}</h3>
      <p className="line-clamp-2 text-sm dark:text-gray-300 text-gray-700">
        {blog.description}
      </p>

      <div className="flex flex-wrap gap-3 my-2">
        {blog.keywords?.map((tech, index) => {
          return (
            <span
              key={index}
              className="rounded-3xl bg-emerald-400 text-black  py-0.5 px-3  transition-all duration-300 hover:scale-90 shadow-lg "
            >
              {tech}
            </span>
          );
        })}
      </div>
    </div>
  );
}
