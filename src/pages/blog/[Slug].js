import matter from "gray-matter"
import path from 'path'
import fs from 'fs'
import { marked } from "marked";
import hljs from "highlight.js";
import { sortByDate } from "../../components/Sort"
import { Twitter, Whatsapp, Reddit } from "react-social-sharing";
import Head from "next/head";

export default function BlogPost({ frontmatter, Slug, content, posts }) {
    marked.setOptions({

        highlight: function (code, lang) {
            return hljs.highlight(lang, code).value;
        },
        headerIds: false,
        mangle: false,
        gfm: true,
    });
    let markdown = marked(content);
    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="title" content={frontmatter.title} />
                <meta name="description" content={frontmatter.desc} />
                <meta name="author" content="Nilesh Darji" />
                <meta name="keywords" content={`Nilesh blog,nilesh darji,blog,${frontmatter.keyword.map((item) => { return item })}`} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://nileshblogs.vercel.app/blog/${frontmatter.slug}/`} />
                <meta property="og:title" content={frontmatter.title} />
                <meta property="og:description" content={frontmatter.desc} />
                <meta property="og:image" content={`https://nileshblogs.vercel.app${frontmatter.cover_image}/`} />

                <meta property="twitter:card" content="summary" />
                <meta property="twitter:url" content={`https://nileshblogs.vercel.app/blog/${frontmatter.slug}/`} />
                <meta property="twitter:title" content={frontmatter.title} />
                <meta property="twitter:description" content={frontmatter.desc} />
                <meta property="twitter:image" content={`https://nileshblogs.vercel.app${frontmatter.cover_image}/`} />
                <meta name="robots" content="index, follow" />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <title>{frontmatter.title}</title>
            </Head>
            <article className="px-4 md:py-24 py-10 mx-auto max-w-7xl" itemScope itemType="http://schema.org/BlogPosting">
                <div className="max-w-full mx-auto  mb-10 lg:max-w-3xl md:max-w-2xl sm:max-w-xl">
                    <div className="pb-6 mb-6 border-b border-gray-200 dark:border-gray-700 ">
                        <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-gray-200 md:leading-tight md:text-4xl" itemProp="headline" title={frontmatter.title}>
                            {frontmatter.title}
                        </h1>
                        <p className="text-base text-gray-500 capitalize dark:text-gray-300">{frontmatter.date}</p>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-200 mb-6 space-x-2">
                        <p className="">Share this article on</p>
                        <Twitter solid small message={`CheckOut This Amazing Blog about ${frontmatter.title} posted by Nilesh Darji\n`} link={`https://nileshblogs.vercel.app/blog/${frontmatter.slug}/`} />
                        <Whatsapp solid small message={`CheckOut This Amazing Blog about ${frontmatter.title} posted by Nilesh Darji\n`} link={`https://nileshblogs.vercel.app/blog/${frontmatter.slug}/`} />
                        <Reddit solid small message={`CheckOut This Amazing Blog on ${frontmatter.title} posted by Nilesh Darji\n`} link={`https://nileshblogs.vercel.app/blog/${frontmatter.slug}/`} />
                    </div>

                    <img src={frontmatter.cover_image} className="object-cover hover:opacity-80 transition-all w-full  bg-center rounded" alt={frontmatter.title} />
                </div>

                {content && <div className="max-w-full mx-auto  lg:max-w-3xl md:max-w-2xl sm:max-w-xl prose sm:prose-sm md:prose-lg lg:prose-xl   prose-pre:bg-zinc-900  prose-violet prose-pre:shadow-lg dark:prose-invert prose-pre:select-all" dangerouslySetInnerHTML={{ __html: markdown }}></div>}

            </article>

        </>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))

    const paths = files.map((filename) => ({
        params: {
            Slug: filename.replace('.md', ''),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { Slug } }) {

    const markdownWithMeta = fs.readFileSync(
        path.join('posts', Slug + '.md'),
        'utf-8'
    )

    const { data: frontmatter, content } = matter(markdownWithMeta)

    // Get slug and frontmatter from posts
    const files = fs.readdirSync(path.join('posts'))
    const posts = files.map((filename) => {
        const slug = filename.replace('.md', '')
        const markdown = fs.readFileSync(
            path.join('posts', filename),
            'utf-8'
        )
        const { data: frontmatter } = matter(markdown)
        return {
            slug,
            frontmatter,
        }
    })

    return {
        props: {
            frontmatter,
            Slug,
            content,
            posts: posts.sort(sortByDate)
        },
    }
}