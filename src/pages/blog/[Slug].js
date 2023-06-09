import matter from "gray-matter"
import path from 'path'
import fs from 'fs'
import { marked } from "marked";
import hljs from "highlight.js";
import { sortByDate } from "../../components/Sort"
import { Twitter, Whatsapp, Linkedin } from "react-social-sharing";
import Head from "next/head";

export default function BlogPost({ frontmatter, Slug, content, posts }) {
    marked.setOptions({
        highlight: function (code, lang) {
            return hljs.highlight(lang, code).value;
        },
        gfm: true,
    });
    let markdown = marked(content);
    return (
        <>
            <Head>
                <title>{frontmatter.title}</title>
            </Head>
            <article class="px-4 md:py-24 py-10 mx-auto max-w-7xl" itemscope itemtype="http://schema.org/BlogPosting">
                <div class="max-w-full mx-auto  mb-10 lg:max-w-3xl md:max-w-2xl sm:max-w-xl">
                    <div class="pb-6 mb-6 border-b border-gray-200 dark:border-gray-700 ">
                        <h1 class="mb-3 text-3xl font-bold text-gray-900 dark:text-gray-200 md:leading-tight md:text-4xl" itemprop="headline" title={frontmatter.title}>
                            {frontmatter.title}
                        </h1>
                        <p class="text-base text-gray-500 capitalize dark:text-gray-300">{frontmatter.date}</p>
                    </div>
                    <div class="flex items-center text-gray-600 dark:text-gray-200 mb-6 space-x-2">
                        <p class="">Share this article on</p>
                        <Twitter solid small message={`CheckOut This Amazing Blog about ${frontmatter.title} posted by Nilesh Darji`} link={`https://nileshblogs.vercel.app/blog/${frontmatter.slug}/`} />
                        <Whatsapp solid small message={`CheckOut This Amazing Blog about ${frontmatter.title} posted by Nilesh Darji`} link={`https://nileshblogs.vercel.app/blog/${frontmatter.slug}/`} />
                        <Linkedin solid small message={`CheckOut This Amazing Blog about ${frontmatter.title} posted by Nilesh Darji`} link={`https://nileshblogs.vercel.app/blog/${frontmatter.slug}/`} />
                    </div>

                    <img src={frontmatter.cover_image} class="object-cover hover:opacity-80 transition-all w-full  bg-center rounded" alt={frontmatter.title} />
                </div>

                {content && <div class="max-w-full mx-auto  lg:max-w-3xl md:max-w-2xl sm:max-w-xl prose sm:prose-sm md:prose-lg lg:prose-xl   prose-pre:bg-zinc-900  prose-violet prose-pre:shadow-lg dark:prose-invert prose-pre:select-all" dangerouslySetInnerHTML={{ __html: markdown }}></div>}

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