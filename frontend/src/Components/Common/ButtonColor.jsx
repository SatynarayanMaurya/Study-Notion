import React from 'react'
import { useNavigate } from 'react-router-dom'

function ButtonColor({color, textColor,text ,linkto}) {
    const navigate = useNavigate()
  return (
    <div>
      <button onClick={()=>navigate(linkto)} className={`bg-[${color}] text-${textColor} px-8 py-2 rounded-lg font-semibold `}>{text}</button>
    </div>
  )
}

export default ButtonColor
