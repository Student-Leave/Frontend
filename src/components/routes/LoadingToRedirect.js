import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/style.css'


const LoadingToRedirect = () => {
    const [count, setCount] = useState(10)
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        // Redirect
        count === 0 && navigate('/')

        return () => clearInterval(interval)

    }, [count])


    return (
        <section className='Loading'>
            <div>
                <h1>
                    ไม่มีสิทธ์การเข้าถึง กรุณาเข้าสู่ระบบ
                </h1>
                <h1>จะกลับไปยังหน้าเข้าสู่ระบบใน {count}</h1>
            </div>
        </section>
    )
}

export default LoadingToRedirect
