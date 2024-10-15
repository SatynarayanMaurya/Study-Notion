import React from 'react'
import { TypeAnimation } from 'react-type-animation';


function CodingPart({text,active}) {

  return (
    <div className='flex  sm:w-[500px] w-[380px]'>
            <div className='w-[7%] flex flex-col gap-0'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className='w-[90%] '>
                <TypeAnimation className={!active?"text-[#cfab08]" : "text-[#f37290] "}
                    sequence={[text,2000,""]}
                    wrapper="span"
                    speed={50}
                    style={{ whiteSpace:"pre-line", fontSize:"16px", display: 'inline-block' }}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                    />
            </div>
    </div>
  )
}

export default CodingPart
