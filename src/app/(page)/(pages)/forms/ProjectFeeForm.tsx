'use client'
import { Card } from 'primereact/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel';
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from 'react'
import { TaxpayerTalbe } from './tables/taxpayer-table'
import { Payment, taxpayerColumn } from "./columns/taxpayer-column"
import { Textarea } from "@/components/ui/textarea"


const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "1@qq.com"
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: ""
  }
]
// ...


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

const ProjectFeeForm = (props) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

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

    // if(response.ok) {
    //   router.push('/sign-in')
    // } else {
    //   toast({
    //     title: "Error",
    //     description: "Oops! Something when wrong!",
    //     variant: "destructive"
    //   })
    // }
  }


  return (
    <p className="m-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          {/* <div className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>凭证编号：</FormLabel>
                    <FormControl>
                      <Input className='w-4' placeholder="请输入凭证编号" {...field} />
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
                    <FormLabel>WBS元素</FormLabel>
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
                    <FormLabel>物料号</FormLabel>
                    <FormControl>
                      <Input className='w-3' placeholder="请输入物料号" type="password" {...field} />
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
                    <FormLabel>书名</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入书名" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-6 bg-black text-white p-2 rounded-lg mb-6 hover:text-gray hover:border" type="submit">
              提交
            </Button> */}
          <div className='space-y-5'>
            <Panel header="项目信息">
              <div className="grid grid-cols-4 grid-rows-6 gap-3">
                <div className="col-span-2">1</div>
                <div className="row-start-2">2</div>
                <div className="col-span-3 row-start-2">3</div>
                <div className="row-start-3">4</div>
                <div className="col-span-3 row-start-3">5</div>
                <div className="col-span-4 row-start-4">6</div>
                <div className="col-span-3 row-start-5">7</div>
                <div className="col-start-4 row-start-5">11</div>
                <div className="row-start-6">13</div>
                <div className="row-start-6">14</div>
                <div className="row-start-6">15</div>
                <div className="row-start-6">16</div>
              </div>
            </Panel>
            <Panel header="费用计入">
              <div className="grid grid-cols-3 grid-rows-3 gap-4">
                <div >1</div>
                <div className="col-span-2">2</div>
                <div className="row-start-2">3</div>
                <div className="row-start-3">5</div>
                <div className="row-start-3">6</div>
                <div className="row-start-3">7</div>
              </div>
            </Panel>
            <Panel header="付款标准">

              <div className="grid grid-cols-4 grid-rows-3 gap-4">
                <div >1</div>
                <div >2</div>
                <div >3</div>
                <div >4</div>
                <div className="col-span-2">5</div>
                <div className="col-span-2 col-start-3">6</div>
                <div className="col-span-2 row-start-3">8</div>
                <div className="col-span-2 col-start-3 row-start-3">9</div>
              </div>
            </Panel>
            <Panel header="付款信息">
              <div className="grid grid-cols-3 grid-rows-2 gap-4">
                <div >1</div>
                <div className="row-start-2">2</div>
                <div className="row-start-2">3</div>
                <div className="row-start-2">4</div>
              </div>
            </Panel>
            <Panel header='收款人信息'>
              <div className="grid grid-cols-3 grid-rows-5 gap-4">
                <div className="col-span-2">1</div>
                <div className="col-start-3">2</div>
                <div className="col-span-2 row-start-2">3</div>
                <div className="col-start-3 row-start-2">4</div>
                <div className="col-span-2 row-start-3">5</div>
                <div className="col-start-3 row-start-3">6</div>
                <div className="row-start-4">7</div>
                <div className="row-start-4">8</div>
                <div className="row-start-4">9</div>
                <div >10</div>
                <div className="col-span-2 row-start-5">11</div>
              </div>
            </Panel>
            <Panel header='计税人信息'>
              <div className="container mx-auto py-10">
                <TaxpayerTalbe columns={taxpayerColumn} data={data} />
              </div>
            </Panel>
            <Panel header="备注">
              <div>
                <Textarea placeholder="Type your message here." />
              </div>
            </Panel>
            <Panel header="附件上传">
              
            </Panel>
          </div >
        </form>
      </Form>
    </p>
  )
}

export default ProjectFeeForm
