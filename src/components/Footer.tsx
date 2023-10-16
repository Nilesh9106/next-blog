import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="text-gray-600 bg-neutral-200/90 dark:bg-neutral-900/90 dark:text-white ">
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 dark:text-gray-50">
                    <Image src={"/logo.png"} alt="Nilesh" width={38} height={38} className=' text-white  bg-violet-600 rounded-full' />
                    <span className="ml-3 text-xl">{"NILESH'S BLOG"}</span>
                </a>
                <Link target="_blank" href={"https://nileshdarji.netlify.app/"}>
                    <p className="text-sm text-gray-500 dark:text-gray-200 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">©2023 Nilesh</p>
                </Link>
            </div>
        </footer>
    )
}
