"use client"

import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const Header = () => {

  const {user, isSignedIn} = useUser()

  return (
    <div className='p-5 flex justify-between items-center border shadow-lg'>
      <Image
      src={"/logo-sidebar.png"}
      width={200}
      height={300}
      />
      <div className='flex gap-3 items-center'>
        <Link href={"/dashboard"}>
          <Button  variant="outline">Dashboard</Button>
        </Link>

        {
          isSignedIn ? (
            <UserButton/>
          ):(
            <Link href={"/sign-in"}>
              <Button>Get Started</Button>
            </Link>
          )
        }
      </div>
      
    </div>
  )
}

export default Header
