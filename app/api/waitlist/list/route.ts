import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { headers } from "next/headers"

// 简单的API密钥验证（在实际应用中应使用更安全的身份验证方式）
const API_KEY = process.env.ADMIN_API_KEY || "secret-api-key"

export async function GET(request: Request) {
  try {
    // 检查API密钥
    const headersList = headers()
    const authHeader = headersList.get("authorization")
    
    if (!authHeader || !authHeader.startsWith("Bearer ") || authHeader.split(" ")[1] !== API_KEY) {
      return NextResponse.json(
        { message: "未授权访问" },
        { status: 401 }
      )
    }

    // 获取查询参数
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // 获取订阅者总数
    const total = await prisma.waitlistSubscriber.count()

    // 获取订阅者列表
    const subscribers = await prisma.waitlistSubscriber.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc"
      }
    })

    return NextResponse.json({
      subscribers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching waitlist:", error)
    return NextResponse.json(
      { message: "服务器错误，请稍后再试" },
      { status: 500 }
    )
  }
} 