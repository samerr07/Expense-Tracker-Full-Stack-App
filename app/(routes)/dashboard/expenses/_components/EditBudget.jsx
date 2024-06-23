"use client"
import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import EmojiPicker from "emoji-picker-react";
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

const EditBudget = ({budgetInfo,refreshData}) => {

    const [emojiIcon, setEmojiIcon] =useState(budgetInfo?.icon)
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false)
    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    
    
    useEffect(()=>{
      if(budgetInfo)
        {
            setEmojiIcon(budgetInfo?.icon)
            setAmount(budgetInfo.amount);
            setName(budgetInfo.name)

        }
    },[budgetInfo])
    const updateBudget = async()=>{
      const result = await db.update(Budgets).set({
        name:name,
        amount:amount,
        icon:emojiIcon
      }).where(eq(Budgets.id,budgetInfo.id))

      if(result){
        refreshData()
        toast("Budget Updated !!")
      }
    }

    
  return (
    <div>
      
      <Dialog>
        <DialogTrigger asChild>
           <Button className="flex gap-2"><PenBox/> Edit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
              <Button variant="outline"
              className="text-lg"
                onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}
              >
                  {emojiIcon}
                </Button>
                <div className="absolute z-20">
                <EmojiPicker open={openEmojiPicker}
                onEmojiClick={(e)=>{
                    setEmojiIcon(e.emoji),
                    setOpenEmojiPicker(false)
                }}
                />
                </div>

                <div className="mt-2">
                    <h2 className="text-black font-medium my-1">Budget Name</h2>
                    <Input defaultValue={budgetInfo?.name} onChange={(e)=>setName(e.target.value)} placeholder="e.g. Home Decor"/>
                </div>
                <div className="mt-2">
                    <h2 className="text-black font-medium my-1">Budget Amount</h2>
                    <Input defaultValue={budgetInfo?.amount} type="number" onChange={(e)=>setAmount(e.target.value)} placeholder="e.g. $500"/>
                </div>

                
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button onClick={updateBudget} disabled={!(name&&amount)} className="w-full mt-5">Submit</Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditBudget
