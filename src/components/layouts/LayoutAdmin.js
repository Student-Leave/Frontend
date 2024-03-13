import React from 'react'
import MenubarAdmin from './MenubarAdmin'
import Footer from './Footer'



const LayoutAdmin = ({ children }) => { // รับ children เพื่อให้เป็นคอมโพเนนต์ที่สามารถแสดงผลได้
    return (
        <>
            <MenubarAdmin />
            {children} {/* แสดง children ที่ได้รับมา */}
            <Footer />
        </>
    )
}

export default LayoutAdmin
