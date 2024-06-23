"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import CardInfo from '../_components/CardInfo'
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import BarChartDashboard from '../_components/BarChartDashboard'
import BudgetItem from './budgets/_components/BudgetItem'
import ExpenseListTable from './expenses/_components/ExpenseListTable'

const Dashboard = () => {

  const {user} = useUser()

  const [budgetList, setBudgetList] = useState([])
  const [expenseList, setExpenseList] = useState([])
  

  const getBudgetList = async()=>{
    
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql `sum(${Expenses.amount})`.mapWith(Number),
      totalItems: sql `count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
    .leftJoin(Expenses,eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy , user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id))
    // console.log(result)
    setBudgetList(result)

    getAllExpense()
  }

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

  useEffect(()=>{
    getBudgetList()
  },[user])

  return (
    <div className='p-8'>
        {/* <UserButton/> */}
        <h2 className='font-bold text-3xl'>Hi, {user?.fullName}✌️</h2>
        <p className='text-gray-500'>Here's what happenning with your money, Lets Manage your expense</p>

        <CardInfo budgetList={budgetList}/>

        <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
          <div className='md:col-span-2'>
            <BarChartDashboard budgetList={budgetList}/>

            <ExpenseListTable expensesList={expenseList} refreshData={()=>getBudgetList()}/>
          </div>
          <div className='grid gap-5'>
            <h2 className='font-bold text-lg'>Latest Budget</h2>
            {
              budgetList.map((e,i)=>(
                <BudgetItem budget={e} key={i}/>
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default Dashboard
