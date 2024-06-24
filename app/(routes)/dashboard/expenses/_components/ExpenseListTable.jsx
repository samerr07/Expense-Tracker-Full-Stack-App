import { db } from '@/utils/dbConfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

const ExpenseListTable = ({expensesList,refreshData}) => {

  const deleteExpense = async(expense)=>{
      const result = await db.delete(Expenses)
      .where(eq(Expenses.id,expense.id))
      .returning()

      if(result){
        toast("Expense Deleted !!!")
        refreshData()
      }
  }

  console.log(expensesList)
  return (
    <div className='mt-3'>
      <h2 className='font-bold text-lg'>Latest Expenses</h2>
      <div className='grid grid-cols-4 p-2 mt-3 bg-slate-200'>
        <h2 className='font-bold'>Name</h2>
        <h2 className='font-bold'>Amount</h2>
        <h2 className='font-bold'>Date</h2>
        <h2 className='font-bold'>Action</h2>
      </div>

      {
        expensesList?.map((e,i)=>(
          <div className='grid grid-cols-4 p-2  bg-slate-50'>
            <h2 >{e.name}</h2>
            <h2 >{e.amount}</h2>
            <h2 >{e.createdAt}</h2>
            <h2 >
              <Trash onClick={()=>deleteExpense(e)} className='text-red-600'/>
            </h2>
          </div>
        ))
      }
    </div>
  )
}

export default ExpenseListTable
