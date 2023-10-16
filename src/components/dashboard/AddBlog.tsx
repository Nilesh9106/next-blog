"use client"
import { IBlog } from "@/models/Blog";
import { Editor } from "@tinymce/tinymce-react";
import { FormEvent, useState } from "react";
import initFullProps from "./tinymceProps";
import { addBlog } from "@/services/blogService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function AddBlog({ editBlog }: { editBlog?: IBlog }) {
    const router = useRouter();
    const [blog, setBlog] = useState<IBlog>(editBlog ? editBlog : {
        comments: [],
        content: "",
        description: "",
        image: "",
        title: "",
        keywords: [],
        likedBy: [],
        slug: "",
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(blog);
        try {
            const res = await toast.promise(addBlog(blog), {
                pending: "Adding Blog...",
                success: "Blog Added",
                error: "Error Adding Blog"
            });
            console.log(res);
            router.push("/blog/" + blog.slug);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <div className='sm:max-w-4xl max-w-full max-sm:mx-2 my-10 px-3 py-5 dark:bg-neutral-900 bg-neutral-100 mx-auto rounded-md border dark:border-neutral-800 border-neutral-200 shadow-lg'>
                <h1 className="text-center text-4xl my-2">Add Blog</h1>
                <form className="flex flex-col justify-center" onSubmit={handleSubmit} >
                    <input required type="text" placeholder="Title" className="input" value={blog.title} onChange={(e) => {
                        blog.title = (e.target as any).value;
                        setBlog({ ...blog })
                    }} />
                    <input required type="text" placeholder="Description" className="input" value={blog.description} onChange={(e) => {
                        blog.description = (e.target as any).value;
                        setBlog({ ...blog })
                    }} />
                    <input required type="url" placeholder="Image link" className="input" value={blog.image} onChange={(e) => {
                        blog.image = (e.target as any).value;
                        setBlog({ ...blog })
                    }} />
                    <input required type="text" pattern="^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$" placeholder="Slug only include hyphen or alphanumeric characters" className="input" value={blog.slug} onChange={(e) => {
                        blog.slug = (e.target as any).value;
                        setBlog({ ...blog })
                    }} />
                    <input required type="text" placeholder="Keywords comma separated" className="input" value={blog.keywords.join(",")} onChange={(e) => {
                        blog.keywords = (e.target as any).value.split(",");
                        setBlog({ ...blog })
                    }} />

                    <Editor
                        id="content"
                        value={blog.content}
                        tinymceScriptSrc="/tinymce/tinymce.min.js"
                        init={{
                            ...initFullProps,
                        }}
                        onEditorChange={(content) => {
                            blog.content = content;
                            setBlog({ ...blog })
                        }}
                    />
                    <button type="submit" className="w-full px-3 py-1 my-3 text-neutral-200 rounded-md bg-violet-600 hover:bg-violet-500 transition-all duration-300" >{
                        editBlog ? "Update" : "Submit"
                    }</button>

                </form>
            </div>
        </>
    )
}
