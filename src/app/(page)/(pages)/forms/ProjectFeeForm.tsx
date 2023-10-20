'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Panel } from 'primereact/panel';
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Tooltip as STooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { FC, useRef, useState } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast'
import { Tooltip } from 'primereact/tooltip'
import { Tag } from 'primereact/tag'
import { ProgressBar } from 'primereact/progressbar'
import { LayoutList, TextSelect } from 'lucide-react'
import { DialogComponent } from "../components/DialogComponent";
import { Card } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";


interface InputButtonProps {
  title: string,
  customFunc: () => void,
  icon: React.ReactNode,
  color: string,
  dotColor?: string
}


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


const ReusableForm = ({ form, name, label, placeholder, className }: {
  form: any
  name?: string
  label?: string
  placeholder?: string
  className?: string
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel dangerouslySetInnerHTML={{ __html: label || '&nbsp;' }}></FormLabel>
          <FormControl>
            <Input className={className} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}



export const InputButton: FC<InputButtonProps> = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipProvider>
    <STooltip>
      <TooltipTrigger>
        <button
          type="button"
          onClick={() => customFunc()}
          style={{ color }}
          className="relative border border-zinc-200 bg-transparent px-3 py-1 mx-2 mt-2 text-sm shadow-sm transition-colors rounded-md hover:bg-light-gray"
          data-pr-tooltip={title}    >
          <span
            style={{ background: dotColor }}
            className="absolute inline-flex  rounded-full h-2 w-2 right-2 top-2"
          />
          {icon}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{title}</p>
      </TooltipContent>
    </STooltip>
  </TooltipProvider>
);


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

  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

    return (
      <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: '40%' }}>
          <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
        <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };



  return (
    <p className="m-0 h-screen overflow-scroll">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className='space-y-5'>
            <Panel header="项目信息">
              <div className="grid grid-cols-4 grid-rows-6 gap-3">
                <div className="col-span-2">
                  <ReusableForm form={form} name='username' label='凭证编号：' placeholder='' />
                </div>
                <div className="row-start-2">
                  <ReusableForm form={form} name='' label='WBS元素：' placeholder='' />
                </div>
                <div className="col-span-3 row-start-2">
                  <div className="flex">
                    <div className="flex-grow">
                      <ReusableForm form={form} name='' label='' placeholder='' />
                    </div>
                    <div className='mt-4'>
                      <DialogComponent title="WBS元素">
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                              Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                          </div>
                        </div>
                      </DialogComponent>
                    </div>
                  </div>
                </div>
                <div className="row-start-3">
                  <ReusableForm form={form} name='' label='物料号：' placeholder='' />
                </div>
                <div className="col-span-1 row-start-3">
                  <ReusableForm form={form} name='' label='所属部门：' placeholder='' />
                </div>
                <div className="col-span-2 row-start-3">
                  <ReusableForm form={form} name='' label='' placeholder='' />
                </div>
                <div className="col-span-4 row-start-4">
                  <ReusableForm form={form} name='' label='书名：' placeholder='' />
                </div>
                <div className="col-span-3 row-start-5">
                  <ReusableForm form={form} name='' label='著译者：' placeholder='' />
                </div>
                <div className="col-start-4 row-start-5">
                  <ReusableForm form={form} name='' label='策划编辑：' placeholder='' />
                </div>
                <div className="row-start-6">
                  <ReusableForm form={form} name='' label='创建人：' placeholder='' />
                </div>
                <div className="row-start-6">
                  <ReusableForm form={form} name='' label='创建日期：' placeholder='' />
                </div>
                <div className="row-start-6">
                  <ReusableForm form={form} name='' label='最后修改人：' placeholder='' />
                </div>
                <div className="row-start-6">
                  <ReusableForm form={form} name='' label='最后修改日期：' placeholder='' />
                </div>
              </div>
            </Panel>
            <Panel className='hidden' header="费用计入">
              <div className="grid grid-cols-3 grid-rows-3 gap-4">
                <div >
                  <ReusableForm form={form} name='' label='内部订单：' placeholder='' />
                </div>
                <div className="col-span-2">
                  <ReusableForm form={form} name='' label='' placeholder='' />
                </div>
                <div className="row-start-2">
                  <ReusableForm form={form} name='' label='费用开支范围：' placeholder='' />
                </div>
                <div className="row-start-3">
                  <ReusableForm form={form} name='' label='公司代码：' placeholder='' />
                </div>
                <div className="row-start-3">
                  <ReusableForm form={form} name='' label='申请人编号：' placeholder='' />
                </div>
                <div className="row-start-3">
                  <ReusableForm form={form} name='' label='管理员：' placeholder='' />
                </div>
              </div>
            </Panel>
            <Panel header="费用计入">
              <div className="grid grid-cols-3 grid-rows-2 gap-4">
                <div >
                  <ReusableForm form={form} name='' label='WBS元素：' placeholder='' />
                </div>
                <div className="col-span-2">
                  <div className="flex">
                    <div className="flex-grow">
                      <ReusableForm form={form} name='' label='' placeholder='' />
                    </div>
                    <div className='mt-4'>
                      <DialogComponent title="WBS元素">
                        <Card>
                          <div>11111</div>
                        </Card>
                      </DialogComponent>
                    </div>
                  </div>
                </div>
                <div className="row-start-2">
                  <ReusableForm form={form} name='' label='公司代码：' placeholder='' />
                </div>
                <div className="row-start-2">
                  <ReusableForm form={form} name='' label='申请人编号：' placeholder='' />
                </div>
                <div className="row-start-2">
                  <div className="flex">
                    <div className="flex-grow">
                      <ReusableForm form={form} name='' label='管理员：' placeholder='' />
                    </div>
                    <div className='mt-4'>
                      <DialogComponent title="WBS元素">
                        <Card>
                          <div>11111</div>
                        </Card>
                      </DialogComponent>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
            <Panel header="付款标准">

              <div className="grid grid-cols-4 grid-rows-3 gap-4">
                <div >
                  <ReusableForm form={form} name='' label='费用类型：' placeholder='' />
                </div>
                <div >
                  <ReusableForm form={form} name='' label='对方提供发票：' placeholder='' />
                </div>
                <div >
                  <ReusableForm form={form} name='' label='费用性质：' placeholder='' />
                </div>
                <div >
                  <ReusableForm form={form} name='' label='区域：' placeholder='' />
                </div>
                <div className="col-span-2">
                  <ReusableForm form={form} name='' label='付款字数：' placeholder='' />
                </div>
                <div className="col-span-2 col-start-3">
                  <ReusableForm form={form} name='' label='付款标准：' placeholder='' />
                </div>
                <div className="col-span-1 row-start-3">
                  <ReusableForm form={form} name='' label='付款总金额：' placeholder='' />
                </div>
                <div className="col-span-2 col-start-2 row-start-3">
                  <ReusableForm form={form} name='' label='金额大写：' placeholder='' />
                </div>
              </div>
            </Panel>
            <Panel header="付款信息">
              <div className="grid grid-cols-3 grid-rows-2 gap-4">
                <div >
                  <ReusableForm form={form} name='' label='付款状态：' placeholder='' />
                </div>
                <div className="row-start-2">
                  <ReusableForm form={form} name='' label='会计凭证编号：' placeholder='' />
                </div>
                <div className="row-start-2">
                  <ReusableForm form={form} name='' label='付款日期：' placeholder='' />
                </div>
                <div className="row-start-2">
                  <ReusableForm form={form} name='' label='实付金额：' placeholder='' />
                </div>
              </div>
            </Panel>
            <Panel header='收款人信息'>
              <div className="grid grid-cols-3 grid-rows-5 gap-4">
                <div className="col-span-1">
                  <ReusableForm form={form} name='' label='收款人编号：' placeholder='' />
                </div>
                <div className="col-span-1">
                  <div className="flex">
                    <div className="flex-grow">
                      <ReusableForm form={form} name='' label='' placeholder='' />
                    </div>
                    <div className='mt-4'>
                      <DialogComponent title="WBS元素">
                        <Card>
                          <div>11111</div>
                        </Card>
                      </DialogComponent>
                    </div>
                  </div>
                </div>
                <div className="col-span-1">
                  <ReusableForm form={form} name='' label='计税人数：' placeholder='' />
                </div>
                <div className="col-span-2 row-start-2">
                  <ReusableForm form={form} name='' label='地址：' placeholder='' />
                </div>
                <div className="col-start-3 row-start-2">
                  <ReusableForm form={form} name='' label='邮编：' placeholder='' />
                </div>
                <div className="col-span-2 row-start-3">
                  <ReusableForm form={form} name='' label='单位：' placeholder='' />
                </div>
                <div className="col-start-3 row-start-3">
                  <ReusableForm form={form} name='' label='手机：' placeholder='' />
                </div>
                <div className="row-start-4">
                  <ReusableForm form={form} name='' label='支付途径：' placeholder='' />
                </div>
                <div className="row-start-4">
                  <div className="flex">
                    <div className="flex-grow">
                      <ReusableForm form={form} name='' label='账户ID：' placeholder='' />
                    </div>
                    <div className='mt-4'>
                      <DialogComponent title="WBS元素">
                        <Card>
                          <div>11111</div>
                        </Card>
                      </DialogComponent>
                    </div>
                  </div>
                </div>
                <div className="row-start-4">
                  <ReusableForm form={form} name='' label='持有人：' placeholder='' />
                </div>
                <div className="col-span-1 row-start-5">
                  <ReusableForm form={form} name='' label='账号：' placeholder='' />
                </div>
                <div className="col-span-2">
                  <ReusableForm form={form} name='' label='开户行：' placeholder='' />
                </div>
              </div>
            </Panel>
            <Panel header='计税人信息'>
              <div className="container mx-auto py-10">

              </div>
            </Panel>
            <Panel header="备注">
              <div>
                <Textarea placeholder="Type your message here." />
              </div>
            </Panel>
            <Panel header="附件上传">
              <Toast ref={toast}></Toast>
              <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
              <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
              <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
              <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />

            </Panel>
            <Button className="w-full mt-6 bg-black text-white p-2 rounded-lg mb-6  hover:text-gray hover:border" type="submit">
              提交
            </Button>
          </div >
        </form>
      </Form>
    </p>
  )
}

export default ProjectFeeForm
