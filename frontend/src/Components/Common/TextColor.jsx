import React from 'react'

function TextColor({text,textColor}) {
  return (
    <div>
      <span className={`text-${textColor} `}>{text}</span>
    </div>
  )
}

export default TextColor
