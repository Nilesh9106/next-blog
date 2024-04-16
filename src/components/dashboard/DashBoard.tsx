"use client";
import { BlogService } from "@/services/blogService";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { toast } from "react-toastify";
import { BlogType } from "@/types/models";

const TableRow = ({
  blog,
  onDelete,
}: {
  blog: BlogType;
  onDelete: () => void;
}) => {
  const handleDelete = async () => {
    if (window.confirm("are you sure to delete blog " + blog.title)) {
      try {
        let res = await toast.promise(BlogService.deleteBlog(blog.slug), {
          pending: "Deleting Blog...",
          success: "Blog Deleted",
          error: "Error Deleting Blog",
        });
        onDelete();
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Return the JSX for the table row
  return (
    <tr className="border-b border-neutral-200 dark:border-neutral-800">
      <td className="px-5 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 text-sm">
        <p className="text-neutral-900 dark:text-neutral-100 whitespace-no-wrap">
          {blog.title}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 text-sm">
        <p className="text-neutral-900 dark:text-neutral-100 whitespace-no-wrap">
          {blog.createdAt}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 text-sm flex justify-center ">
        <Link
          href={`/blog/${blog.slug}`}
          className=" text-emerald-400 underline underline-offset-2 font-bold py-3 px-4 rounded mr-2"
        >
          View
        </Link>
        <Link
          href={`admin/edit/${blog.slug}`}
          className=" text-blue-400 underline underline-offset-2 font-bold py-3 px-4 rounded mr-2"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className=" text-red-400 underline underline-offset-2 font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default function DashBoard() {
  const [blogs, setBlogs] = useState<BlogType[]>();
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    const data = await BlogService.getBlogs();
    setBlogs(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  return (
    <>
      <div className="sm:w-2/3 max-sm:w-full mx-auto flex flex-col px-2 sm:px-8 py-4">
        {!blogs || loading ? (
          <Loading />
        ) : (
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-x-auto">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-center text-xs font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <TableRow
                      key={blog.slug}
                      blog={blog}
                      onDelete={() => {
                        setBlogs(blogs.filter((b) => b.slug !== blog.slug));
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="my-5">
          <Link
            href={"admin/add"}
            className="bg-neutral-900 dark:bg-neutral-100 dark:text-neutral-800 transition-all active:scale-95   text-white font-bold py-2 px-4 rounded-md"
          >
            Add Blog
          </Link>
        </div>
      </div>
    </>
  );
}
