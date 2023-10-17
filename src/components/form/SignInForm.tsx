'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Link from "next/link"
import GoogleSignInButton from "../GoogleSignInButton"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
})


const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const signInData = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });

    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Oops! Something when wrong!",
        variant: "destructive"
      })
    } else {
      router.refresh();
      router.push('/ecommerce');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
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
        </div>
        <Button className="w-full mt-6 bg-black text-white p-2 rounded-lg mb-6 hover:text-gray hover:border" type="submit">
          登录
        </Button>
      </form>
      {/* <div className="mx-auto my-4 flex w-full items-center justify-evenly
      before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400
      after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <GoogleSignInButton>Sign in with Google</GoogleSignInButton> */}
      <p className="text-center text-sm text-gray-600 mt-2  mx-10">
        {/* If you don&apos;t have an account, please&nbsp; */}
        如果你还没有账号，请先进行&nbsp;
        <Link className="mt-3 text-blue-500 hover:underline" href='/sign-up'>注册</Link>
      </p>
    </Form>
  )
}

export default SignInForm
