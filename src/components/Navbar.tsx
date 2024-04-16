"use client";
import Image from "next/image";
import Link from "next/link";
import { SiGithub, SiTwitter } from "react-icons/si";
import { TfiWorld } from "react-icons/tfi";
import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const path = usePathname();
  useEffect(() => {
    setMounted(true);
  }, []);

  const { systemTheme, theme, setTheme } = useTheme();

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme != "dark") {
      return (
        <BsMoon
          className="text-2xl"
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    } else {
      return (
        <BsSun
          className="text-2xl"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    }
  };
  return (
    <>
      <div className="flex p-3 sticky top-0 z-50 items-center sm:justify-center bg-neutral-200/90 dark:bg-neutral-900/90 backdrop-blur-sm ">
        <Link href={"/"}>
          <div className="flex items-center gap-3">
            <Image
              src={"/logo.png"}
              width={40}
              height={40}
              alt="Nilesh"
              quality={100}
              priority
              unoptimized
            />
            <span className="text-2xl">{"NILESH'S BLOG"}</span>
          </div>
        </Link>
        <div className="absolute right-4 flex gap-3">
          {renderThemeChanger()}
        </div>
      </div>
    </>
  );
}
