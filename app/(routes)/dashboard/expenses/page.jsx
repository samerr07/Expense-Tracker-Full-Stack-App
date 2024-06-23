"use client"
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/dbConfig'
import { Budgets,  Expenses } from '@/utils/schema'
import { desc, eq } from 'drizzle-orm'

const ExpensesMain = () => {

    const [expenseList, setExpenseList] = useState([])
    const {user} = useUser()

    useEffect(()=>{
        user && getAllExpense()
    },[])

    const getAllExpense = async()=>{
        const result = await db.select({
          id:Expenses.id,
          name:Expenses.name,
          amount:Expenses.amount,
          createdAt:Expenses.createdAt
        }).from(Budgets)
        .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
        .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
        .orderBy(desc(Expenses.id));
    
        setExpenseList(result)
        console.log(result)
      }
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>My Expenses</h2>
      <ExpenseListTable expensesList={expenseList} refreshData={()=>getAllExpense()}/>
    </div>
  )
}

export default ExpensesMain
