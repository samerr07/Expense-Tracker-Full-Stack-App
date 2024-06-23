import Link from 'next/link'
import React from 'react'

const BudgetItem = ({budget}) => {

  const calcProgressPerc = ()=>{
    const perc = (budget.totalSpend / budget.amount) * 100;

    return perc>100?100: perc.toFixed(2);
  }
  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
    <div className='p-5 rounded-lg border hover:shadow-md cursor-pointer h-[170px]'>
      <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-2 items-center'>
            <h2 className='text-2xl p-3 px-4 rounded-full bg-slate-100'>{budget?.icon}</h2>
            <div>
                <h2 className='font-bold'>{budget.name}</h2>
                <h2 className='text-sm text-gray-500'>{budget.totalItems} Item</h2>
            </div>
        </div>
        <h2 className='font-bold text-primary text-lg'>${budget.amount}</h2>
      </div>

      <div className='mt-5'>
        <div className='flex items-center justify-between mb-3'>
            <h2 className='text-xs text-slate-400'>${budget.totalSpend ? budget.totalSpend : 0}Spend</h2>
            <h2 className='text-xs text-slate-400'>${budget.amount - budget.totalSpend}Remaining</h2>
        </div>

        {/* Progress Bar */}

        <div className='w-full bg-slate-300 h-2 rounded-full'>
            <div className=' bg-primary h-2 rounded-full'
              style={{width:`${calcProgressPerc()}%`}}
            ></div>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default BudgetItem
