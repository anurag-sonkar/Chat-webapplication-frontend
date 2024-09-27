import React from 'react'

function Card() {
  return (
      <div className='grid gap-2 mt-2 mx-1'>
          <div className='flex bg-[#e7f1ff] py-4 justify-evenly items-center rounded-md '>
              <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
              </div>
              <div>
                  <div className='text-xl font-semibold'>Beep Career</div>
                  <div className='text-gray-600'>can't talk whatsapp only</div>
              </div>
              <div className='flex flex-col gap-1'>
                  <div className=' '>8:10 pm</div>
                  <div><div className='w-3 h-3 rounded-full bg-green-700 float-end '></div></div>
              </div>

          </div>
          <hr></hr>
      </div>
  )
}

export default Card