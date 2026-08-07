import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, topic, message } = body;

    const params = new URLSearchParams();
    params.append("name", name || "");
    params.append("email", email || "");
    params.append("topic", topic || "");
    params.append("message", message || "");
    params.append("_subject", `[Mindle Contact] ${topic || "Inquiry"} - ${name || "Visitor"}`);
    params.append("_captcha", "false");

    const origin = request.headers.get("origin") || "https://mindle.in";
    const referer = request.headers.get("referer") || "https://mindle.in/";

    const res = await fetch("https://formsubmit.co/ajax/b1d1473a4f2295640caeb8949e97fa3c", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Referer: referer,
        Origin: origin,
      },
      body: params.toString(),
    });

    const data = await res.json();
    console.log("FormSubmit response:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
