"use client"
import { redirect, useRouter } from "next/navigation";
import { FormEvent } from "react"

export default function Auth() {
    const router = useRouter();
    const loginUser = (e: FormEvent) => {
        e.preventDefault();
        const password = (e.target as any).password.value;
        if (password == process.env.NEXT_PUBLIC_PASSWORD as string) {
            localStorage.setItem("token", password);
            console.log("Logged In");
            router.push("/admin");
        } else {
            console.log(process.env);
            alert("Wrong Password");
        }
    }
    return (
        <>
            <div className='max-w-2xl max-md:mx-10 my-10 px-3 py-5 dark:bg-neutral-900 bg-neutral-100 mx-auto rounded-md border dark:border-neutral-800 border-neutral-200 shadow-lg'>
                <h1 className="text-center text-4xl my-2">Login</h1>
                <form className="flex flex-col justify-center" onSubmit={(e) => loginUser(e)}>
                    <input required type="password" placeholder="Password" name="password" className="w-full px-3 py-1 my-3 rounded-md dark:bg-neutral-800 outline-none transition-all border dark:border-neutral-700 border-neutral-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-200" />

                    <button type="submit" className="w-full px-3 py-1 my-3 text-neutral-200 rounded-md bg-violet-600 hover:bg-violet-500 transition-all duration-300" >Submit</button>
                </form>
            </div>
        </>
    )
}
