import { db } from "@/configs/db";
import { WireFrameToCodeTable } from "@/configs/schema";
import { error } from "console";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { description, imageUrl, model, uid, email } = await req.json();

  const result = await db
    .insert(WireFrameToCodeTable)
    .values({
      uid: uid,
      imageUrl: imageUrl,
      model: model,
      description: description,
      createdBy: email,
      //   code: json(),
    })
    .returning({ id: WireFrameToCodeTable.id });

  return NextResponse.json(result);
}

export async function GET(req: NextRequest) {
  const requrl = req.url;
  const { searchParams } = new URL(requrl);
  const uid = searchParams.get("uid");

  if (uid) {
    const result = await db.select().from(WireFrameToCodeTable).where(eq(WireFrameToCodeTable.uid, uid));
    return NextResponse.json(result[0]);
  }

  return NextResponse.json({
    error : "No response found",
  })
}
