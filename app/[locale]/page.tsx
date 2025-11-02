"use client";
import { useEffect } from "react";

export default function Home() {
  // useEffect(() => {
  //   const getBlogInfo = async () => {
  //     const res = await fetch(
  //       `/api/blogs/c0667659-7de2-4ff3-92d5-88ddef64c137`
  //     );
  //     const data = await res.json();
  //     console.log(data.blog);
  //   };
  //   getBlogInfo();
  // }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Hello world</h1>
    </main>
  );
}
