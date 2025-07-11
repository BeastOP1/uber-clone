import { data } from "@/constants";
import { neon } from "@neondatabase/serverless";

export async function POST(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 404 },
      );
    }

    const response = await sql`
        INSERT INTO users (
        name,
        email,
        clerk_id
        ) 
        VALUES (
        ${name},
        ${email}, 
        ${clerkId}
        )
        `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    console.log("Post", error);
    return Response.json({ data: { error: error } });
  }
}
