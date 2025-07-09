import { WaitlistForm } from "@/components/waitlist-form"
import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "加入等待名单",
  description: "注册以获取产品发布的最新消息",
}

export default function WaitlistPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回首页
          </Link>
          <h1 className="text-4xl font-bold">加入我们的等待名单</h1>
          <p className="text-xl text-muted-foreground">
            注册以获取产品发布的最新消息和独家优惠
          </p>
        </div>
        
        <div className="bg-card border rounded-lg shadow-lg p-6">
          <WaitlistForm />
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>加入等待名单即表示您同意我们的</p>
          <div className="flex justify-center space-x-2">
            <Link href="#" className="underline hover:text-foreground">服务条款</Link>
            <span>和</span>
            <Link href="#" className="underline hover:text-foreground">隐私政策</Link>
          </div>
        </div>
      </div>
    </div>
  )
} 