import { NextResponse } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // 验证邮箱
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { message: "请提供有效的电子邮箱地址" },
        { status: 400 }
      )
    }

    // 检查邮箱是否已存在
    const existingSubscriber = await prisma.waitlistSubscriber.findUnique({
      where: { email },
    })

    if (existingSubscriber) {
      return NextResponse.json(
        { message: "此邮箱已在等待名单中" },
        { status: 409 }
      )
    }

    // 创建新订阅者
    const subscriber = await prisma.waitlistSubscriber.create({
      data: { email },
    })

    return NextResponse.json(
      { message: "成功加入等待名单", id: subscriber.id },
      { status: 201 }
    )
  } catch (error) {
    console.error("Waitlist submission error:", error)
    return NextResponse.json(
      { message: "服务器错误，请稍后再试" },
      { status: 500 }
    )
  }
} 