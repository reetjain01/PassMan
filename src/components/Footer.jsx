import React from 'react'

const Footer = () => {
  return (
    <div className=' bg-slate-900 text-white flex justify-center gap-8 items-center h-12 w-full overflow-x-hidden'>
        <div className="logo font-bold sm:text-xl text-md ">
          <span className=" text-green-500">&lt; </span>
          Pass
          <span className=" text-green-500">Man /&gt;</span>
        </div>
          <div className='sm:text-lg text-[12px] flex sm:flex-row flex-col'>
        Created By Reet Jain
        </div>
    </div>
  )
}

export default Footer