import Image from 'next/image'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sortByDate } from '@/components/Sort'
import { AiOutlineLink } from "react-icons/ai"
import Link from 'next/link'

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Nilesh Blog</title>
      </Head>
      <main className='p-3 md:p-6'>
        <h1 className="text-3xl text-center">Latest Blogs</h1>
        <div className="w-16 h-2 mx-auto rounded-md my-2 bg-violet-400"></div>
        <div className='my-3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 '>
          {posts.map((blog, index) => {
            return (
              <div key={index} className=' rounded-md shadow-lg border  dark:border-neutral-700 border-gray-300 p-3 bg-neutral-200 dark:bg-neutral-900'>

                <div className="relative group card">
                  <img src={blog.frontmatter.cover_image} alt={blog.frontmatter.title} loading="eager" className='aspect-video transition-all duration-300  rounded-md bg-contain group-hover:blur-sm' />
                  <Link href={`/blog/${blog.slug}/`} className="group-hover:opacity-100 group-hover:scale-110 opacity-0 w-full h-full flex justify-center items-center transition-all duration-300 absolute top-0 right-0">
                    <AiOutlineLink className="text-3xl text-white" />
                  </Link>
                </div>
                <h3 className='text-lg my-2'>{blog.frontmatter.title}</h3>
                <p className='line-clamp-2 text-sm dark:text-gray-300 text-gray-700'>{blog.frontmatter.desc}</p>

                <div className="flex flex-wrap gap-3 my-2" >
                  {blog.frontmatter.keyword.map((tech, index) => {
                    return (
                      <span key={index} className="rounded-3xl bg-violet-300 text-black border dark:border-gray-700 border-gray-300 py-0.5 px-3  transition-all duration-300 hover:scale-90 shadow-lg ">
                        {tech}
                      </span>
                    )
                  })}
                </div>

              </div>
            )
          })}
        </div>
      </main>
    </>
  )
}


export async function getStaticProps() {

  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace('.md', '')

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  }
}