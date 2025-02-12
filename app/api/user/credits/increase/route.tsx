import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";

export async function PUT(req: NextRequest) {
  const { userEmail } = await req.json();
  console.log(userEmail);
  // try {
  const result = await db.select().from(usersTable).where(eq(usersTable.email, userEmail));

  if (result?.length == 0) {
    const result: any = await db
      .update(usersTable)
      .set({
        credits: 10,
      })
      .where(eq(usersTable.email, userEmail))
      // @ts-ignore
      .returning(usersTable);

    return NextResponse.json(result[0]);
  }
  return NextResponse.json(result[0]);

  // } catch (e) {
  //     return NextResponse.json(e)
  // }
}
