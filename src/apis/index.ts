"use client";
export async function fetchContent(section: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/content/${section}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch content");
  }
  return res.json();
}
