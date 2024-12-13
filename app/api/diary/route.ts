import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
      .from("diaries")
      .select("*")
      .eq("user_id", session.user.id)
      .order("diary_date", { ascending: false });

    if (error) {
      console.error("Error fetching diaries:", error);
      return new NextResponse("Failed to fetch diaries", { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in diary GET route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { content, diary_date } = await req.json();
    if (!content || !diary_date) {
      return new NextResponse("Content and date are required", { status: 400 });
    }

    const supabase = createRouteHandlerClient({ cookies });
    const { data, error } = await supabase
      .from("diaries")
      .insert([
        {
          user_id: session.user.id,
          content,
          diary_date,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating diary:", error);
      return new NextResponse("Failed to create diary", { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in diary POST route:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
