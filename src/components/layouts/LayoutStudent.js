import React from 'react'
import MenubarStudent from './MenubarStudent'
import Footer from './Footer'


const LayoutStudent = ({ children }) => { // รับ children เพื่อให้เป็นคอมโพเนนต์ที่สามารถแสดงผลได้
    return (
        <>
            <MenubarStudent />
            {children} {/* แสดง children ที่ได้รับมา */}
            <Footer />
        </>
    )
}

export default LayoutStudent
