import { Bot, ImageUp } from 'lucide-react'
import React from 'react'
import ImageUpload from './_components/ImageUpload'

function Dashboard() {
    return (
        <div>
            {/* <div className=' flex flex-row'> */}
            {/* <Bot className=""/> */}
            <h2 className='font-bold text-3xl text-center'>
                Convert your ideas into code
            </h2>


            {/* </div> */}
            <ImageUpload/>
        </div>
    )
}

export default Dashboard