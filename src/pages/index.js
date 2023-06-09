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
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="title" content="Nilesh's Blog" />
        <meta name="description" content="This is my personal blogging website.Here you can find my latest blogs and articles which I will publish here." />
        <meta name="author" content="Nilesh Darji" />
        <meta name="keywords" content="Nilesh blog,nilesh darji,nilesh darji portfolio,nilesh,ddu,next js,blog, blog app" />
        <link rel="canonical" href="https://nileshblogs.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nileshblogs.vercel.app/" />
        <meta property="og:title" content="nilesh blog" />
        <meta property="og:description" content="This is my personal blogging website.Here you can find my latest blogs and articles which I will publish here." />
        <meta property="og:image" content="https://nileshblogs.vercel.app/logo.png" />
        <meta name="google-site-verification" content="xy1FyOILRbps4rSWe35dSmQ7AKIUFfrHPQTinrwfEUw" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content="https://nileshblogs.vercel.app/" />
        <meta property="twitter:title" content="nilesh blog" />
        <meta property="twitter:description" content="This is my personal blogging website.Here you can find my latest blogs and articles which I will publish here." />
        <meta property="twitter:image" content="https://nileshblogs.vercel.app/logo.jpg" />
        <meta name="robots" content="index, follow" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
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