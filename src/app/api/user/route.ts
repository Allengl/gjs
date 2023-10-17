import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt'
import { z } from "zod";

// Define a schema for input validation
const userSchema = z
  .object({
    username: z.string()
      .min(1, 'Username is required')
      .max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
  })

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    // check if email is already exist
    const existingUserByEmail = await db.user.findUnique({
      where: {email: email }
    })
    if (existingUserByEmail) return NextResponse.json({ user: null, message: 'User With this email already exist' }, { status: 409 })

    // check if username is already exist
    const existingUserByUsername = await db.user.findUnique({
      where: {username: username}
    })
    if (existingUserByUsername) return NextResponse.json({ user: null, message: 'User With this username already exist' }, { status: 409 })

    // create user
    const hashedPassword = await hash(password, 10)
    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword
      }
    })
    const { password: newUserPassword, ...rest } = newUser;


    return NextResponse.json({ user: rest, message: "User created successfully"}, 
    { status: 201});
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ message: "Something went wrong"}, 
    { status: 500});
  }
}
