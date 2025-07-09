import { PasswordGenerator } from "@/components/password-generator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">我们的产品即将上线</h1>
        <p className="text-xl mb-6">立即加入等待名单，获取最新消息和独家优惠</p>
        <Link href="/waitlist">
          <Button size="lg">加入等待名单</Button>
        </Link>
      </div>
      
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">同时试试我们的密码生成器</h2>
        <PasswordGenerator />
      </div>
    </div>
  );
}
