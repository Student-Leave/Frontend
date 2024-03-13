//rafc
import React, { useState } from 'react'
import { toast } from 'react-toastify';

// functions
import { login } from '../../functions/auth'


// redux
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// Icon
import { FaLock, FaUser, FaArrowRightToBracket } from "react-icons/fa6";
import { PiHandWavingFill } from "react-icons/pi";

// Boostrap
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

const Login = () => {
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const [loading, setLoading] = useState(false)


    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [value, setValue] = useState({
        studentID: "",
        password: "",

    })

    const roleBaseRedirect = (role) => {
        if (role === 'admin') {
            navigate('/admin/mangeadmin')
        } else if (role === 'teacher') {
            navigate('/teacher/dashboard')
        }
        else {
            navigate('/user/leavepage')

        }
    }
    const handleChange = (e) => {

        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = (e) => {
        setShowModal(true)
        setLoading(true)
        e.preventDefault()


        //code
        login(value)
            .then(res => {
                setShowModal(false)
                setLoading(false)
                toast.success("Login Success");

                dispatch({
                    type: 'LOGIN',
                    payload: {
                        id: res.data.payload.user._id,
                        token: res.data.token,
                        studentID: res.data.payload.user.studentID,
                        role: res.data.payload.user.role,
                        email: res.data.payload.user.email,
                        phone: res.data.payload.user.phone,
                        prefix: res.data.payload.user.prefix,
                        firstname: res.data.payload.user.firstname,
                        lastname: res.data.payload.user.lastname,
                        group: res.data.payload.user.group,

                    }
                });
                localStorage.setItem('token', res.data.token)
                roleBaseRedirect(res.data.payload.user.role)


            }).catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data);
                setShowModal(false)
                setLoading(false)
            })

    }

    return (

        <div className='container Login'>
            <section className='Login' >

                <div className='card-Login' >
                    <img src={require('../../../img/IT_logo_Standard.png')} />
                    <div className='title'>
                        <h1>ล็อกอิน</h1>
                        ยินดีต้อนรับ <PiHandWavingFill />
                    </div>
                    <form className='input-form' onSubmit={handleSubmit}>
                        <div className='wrap'>
                            <div className='input-box'>
                                <label>ชื่อผู้ใช้</label>
                                <div className='input-Login'>
                                    <FaUser /><input type='text' placeholder='*นักศึกษากรอกรหัสนักศึกษา' name='studentID' onChange={handleChange} /> <br />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>รหัสผ่าน</label>
                                <div className='input-Login'>
                                    <FaLock /><input type='password' placeholder='รหัสผ่าน' name='password' onChange={handleChange} /><br />
                                </div>
                            </div>
                        </div>
                        <br />
                        <button ><FaArrowRightToBracket /> ล็อกอิน</button>
                        <div className='line-or'>
                            <hr />
                            <span>หรือ</span>
                            <hr />
                        </div>
                        <div className='btn-register'>
                            ยังไม่ได้สมัครสมาชิก? <Link to={'/register'}>สร้างบัญชี</Link>
                        </div>
                    </form>
                </div>
            </section >
            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton className='ManageAdmin'>
                    <Modal.Title className='ManageAdmin'>กำลังล็อกอิน</Modal.Title>
                </Modal.Header>
                {loading
                    ? <div className='Loading' style={{ textAlign: 'center', margin: '2rem 0', fontSize: '18px' }}>
                        <Spinner animation="border" variant="Dark" />
                    </div>
                    : <div>
                        <div style={{ textAlign: 'center', margin: '2rem 0', fontSize: '18px', fontFamily: 'Prompt' }}>กำลังล็อกอิน</div>

                    </div>
                }

            </Modal>
        </div >

    )
}

export default Login
