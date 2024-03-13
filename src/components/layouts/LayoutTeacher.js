import React from 'react'
import MenubarTeacher from './MenubarTeacher'
import Footer from './Footer'



const LayoutTeacher = ({ children }) => {
    return (
        <>



            <MenubarTeacher />
            {children} {/* แสดง children ที่ได้รับมา */}
            <Footer />

        </>
    )
}

export default LayoutTeacher
