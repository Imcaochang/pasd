"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Copy, RefreshCw } from "lucide-react"

export function PasswordGenerator() {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState([12])
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"

    let characters = ""
    if (includeUppercase) characters += uppercase
    if (includeLowercase) characters += lowercase
    if (includeNumbers) characters += numbers
    if (includeSymbols) characters += symbols

    if (characters === "") {
      toast({
        title: "错误",
        description: "请至少选择一种字符类型",
      })
      return
    }

    let result = ""
    const charactersLength = characters.length
    for (let i = 0; i < passwordLength[0]; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    setPassword(result)
  }

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password)
      toast({
        title: "已复制",
        description: "密码已复制到剪贴板",
      })
    }
  }

  // 初始生成密码
  useEffect(() => {
    generatePassword()
  }, [])

  // 当选项改变时重新生成密码
  useEffect(() => {
    generatePassword()
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-card rounded-lg shadow-lg border">
      <h2 className="text-2xl font-bold text-center">密码生成器</h2>
      
      <div className="flex items-center space-x-2 bg-muted/50 p-3 rounded-md">
        <div className="flex-1 font-mono text-lg overflow-x-auto whitespace-nowrap">
          {password}
        </div>
        <Button variant="ghost" size="icon" onClick={copyToClipboard}>
          <Copy className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={generatePassword}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>密码长度: {passwordLength[0]}</Label>
          </div>
          <Slider
            value={passwordLength}
            min={6}
            max={30}
            step={1}
            onValueChange={setPasswordLength}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="uppercase" 
              checked={includeUppercase} 
              onCheckedChange={(checked) => setIncludeUppercase(checked === true)} 
            />
            <Label htmlFor="uppercase">包含大写字母 (A-Z)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="lowercase" 
              checked={includeLowercase} 
              onCheckedChange={(checked) => setIncludeLowercase(checked === true)} 
            />
            <Label htmlFor="lowercase">包含小写字母 (a-z)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="numbers" 
              checked={includeNumbers} 
              onCheckedChange={(checked) => setIncludeNumbers(checked === true)} 
            />
            <Label htmlFor="numbers">包含数字 (0-9)</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="symbols" 
              checked={includeSymbols} 
              onCheckedChange={(checked) => setIncludeSymbols(checked === true)} 
            />
            <Label htmlFor="symbols">包含特殊符号 (!@#$%^&*)</Label>
          </div>
        </div>

        <Button className="w-full" onClick={generatePassword}>
          生成新密码
        </Button>
      </div>
    </div>
  )
} 