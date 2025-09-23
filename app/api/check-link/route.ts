import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url } = await req.json();

  try {
    const res = await fetch(url, { method: 'GET' });
    const contentType = res.headers.get("content-type");

    return NextResponse.json({
      ok: contentType?.startsWith("image/") ?? false,
      contentType,
    })

  } catch (error) {
    console.log("error: ", error)
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}