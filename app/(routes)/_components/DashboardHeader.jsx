import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const DashboardHeader = () => {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between'>
      <div className='flex gap-2 '>
        <Link className='md:hidden lg:hidden' href={"/dashboard"}>
        <Button>Dashboard</Button>
        </Link>
        <Link className='md:hidden lg:hidden' href={"/dashboard/budgets"}>
        <Button variant="destructive">Budgets</Button>
        </Link>
        <Link className='md:hidden lg:hidden' href={"/dashboard/expenses"}>
        <Button variant="destructive">Expenses</Button>
        </Link>
      </div>
      <div>
        <UserButton/>
      </div>
    </div>
  )
}

export default DashboardHeader
