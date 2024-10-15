import React from 'react'
import loading from "../../assets/TimeLineLogo/loading.gif"
// import loading from "../../assets/TimeLineLogo/loading2.gif"
// import loading from "../../assets/TimeLineLogo/loading3.gif"
function Spinner() {
  return (
    <div className='h-[106vh] flex items-center justify-center -mt-10 fixed inset-0 bg-black  bg-opacity-60 backdrop-blur-sm z-10'>
        <div  className=''>
            <img src={loading} alt="" width={250} />

            {/* loading 2  */}
            {/* <img src={loading} alt="" width={350} /> */}

            {/* loading 3  */}
            {/* <img src={loading} alt="" width={80} /> */}
        </div>
    </div>
  )
}

export default Spinner