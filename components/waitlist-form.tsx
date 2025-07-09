"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { ArrowRight, Loader2 } from "lucide-react"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      toast({
        title: "错误",
        description: "请输入有效的电子邮箱地址",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || '提交失败')
      }

      setEmail("")
      toast({
        title: "成功",
        description: "您已成功加入等待名单！",
      })
    } catch (error) {
      toast({
        title: "错误",
        description: error instanceof Error ? error.message : "提交失败，请稍后再试",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            电子邮箱
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              disabled={isSubmitting}
              required
            />
          </div>
        </div>
        <Button 
          type="submit" 
          className="w-full py-6 text-lg flex items-center justify-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>提交中...</span>
            </>
          ) : (
            <>
              <span>加入等待名单</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
        <p className="text-center text-sm text-gray-500">
          我们不会发送垃圾邮件，您可以随时取消订阅
        </p>
      </form>
    </div>
  )
} 