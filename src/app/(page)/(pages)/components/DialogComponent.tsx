import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LayoutList } from "lucide-react"
import React, { FC } from "react"

interface DialogComponentProps {
  title?: string,
  description?: string,
  children?: React.ReactNode,
}

export const DialogComponent: FC<DialogComponentProps> = ({title, description, children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2 ml-3" variant="outline"><LayoutList color="#83888d" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">取消</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">确定</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
