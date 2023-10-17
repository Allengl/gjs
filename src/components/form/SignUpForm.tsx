'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"

const formSchema = z
  .object({
    username: z.string()
      .min(1, 'Username is required')
      .max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required")
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })


const SignUpForm = () => {
  const router = useRouter();
  const {toast} = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  const onSubmit = async(values: z.infer<typeof formSchema>) => {
  
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password
      })
  })

    if(response.ok) {
      router.push('/sign-in')
    } else {
      toast({
        title: "Error",
        description: "Oops! Something when wrong!",
        variant: "destructive"
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>用户名</FormLabel>
                <FormControl>
                  <Input placeholder="请输入用户名" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密码</FormLabel>
                <FormControl>
                  <Input placeholder="请输入密码" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>确认密码</FormLabel>
                <FormControl>
                  <Input placeholder="请重新输入密码" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6 bg-black text-white p-2 rounded-lg mb-6 hover:text-gray hover:border" type="submit">
          注册
        </Button>
      </form>
      {/* <div className="mx-auto my-4 flex w-full items-center justify-evenly
      before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400
      after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <GoogleSignInButton>Sign up with Google</GoogleSignInButton> */}
      <p className="text-center text-sm text-gray-600 mt-2 mx-10 ">
        已经有了账号了？请点击&nbsp;
        <Link className="text-blue-500 hover:underline" href='/sign-in'>登录</Link>
      </p>
    </Form>
  )
}

export default SignUpForm
