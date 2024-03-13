// rafce
import React, { useState } from 'react'
import { toast } from 'react-toastify';

// functions
import { register } from '../../functions/auth';
import { Link, useNavigate } from 'react-router-dom';

// Icon
import { FaLock, FaUser, FaUserPlus, FaRegIdCard, FaEnvelope, FaUsersRectangle } from "react-icons/fa6";

// bootstrap
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// CSS
import '../../../css/style.css'

const Register = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false)
    const handleCloseModal = () => setShowModal(false);

    const navigate = useNavigate();
    const [value, setValue] = useState({
        studentID: "",
        password: "",
        password1: "",
        email: "",
        phone: "",
        prefix: "",
        firstname: "",
        lastname: "",
        group: "",

    })

    const handleChange = (e) => {
        e.persist();
        // console.log("Taget", e.target.value);


        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value.studentID.length < 9) {
            toast.error('รหัสนักศึกษาต้องมี 9 ตัวอักษร')
        }
        else if (value.password.length < 8) {
            toast.error('รหัสผ่านต้องมี 8 ตัวอักษรขึ้นไป')
        }
        else if (value.password !== value.password1) {
            toast.error('รหัสผ่านไม่ตรงกัน555')
        } else if (!value.email) {
            toast.error('กรุณากรอก อีเมล')
        } else if (!value.prefix) {
            toast.error('กรุณาเลือกคำนำหน้า')
        } else if (!value.firstname) {
            toast.error('กรุณากรอกชื่อ')
        } else if (!value.lastname) {
            toast.error('กรุณากรอกนามสกุล')
        } else if (!value.group) {
            toast.error('กรุณากรอกหมู่เรียน')
        } else if (!value.phone || value.phone.length < 10) {
            toast.error('กรุณากรอกเบอร์โทรศัพท์ 10 หลัก')
        } else {
            setShowModal(true)
        }
    }
    const conFirmRegister = () => {
        register(value)
            .then(res => {
                console.log(res.data);
                toast.success(res.data);
                setLoading(true)
                setTimeout(() => {
                    navigate('/')
                }, 3000);

            }).catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data);
            })
    }
    return (

        <section className='registerUser'>
            <form onSubmit={handleSubmit}>
                <img src={require('../../../img/IT_logo_Standard.png')} />
                <h1>สมัครสมาชิก</h1>
                <div className='input-form'>
                    <div className='wrap'>
                        <div className='box'>
                            <div className='input-box'>
                                <label>ชื่อผู้ใช้</label>
                                <div className='input-Login'>
                                    <FaUser />  <input type='number' name='studentID' placeholder='*นักศึกษากรอกรหัสนักศึกษา' onChange={handleChange} /> <br />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>รหัสผ่าน</label>
                                <div className='input-Login'>
                                    <FaLock /><input type='password' name='password' placeholder='รหัสผ่าน' onChange={handleChange} /><br />
                                </div>
                            </div>

                            <div className='input-box'>
                                <label>ยืนยันรหัสผ่าน</label><br />
                                <div className='input-Login'>
                                    <FaLock /><input type='password' name='password1' placeholder='ยืนยันรหัสผ่าน' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>อีเมล</label><br />
                                <div className='input-Login'>
                                    <FaEnvelope /><input type="email" name='email' placeholder='อีเมล' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>เบอร์โทรศัพท์</label><br />
                                <div className='input-Login'>
                                    <FaEnvelope /><input type='number' name='phone' placeholder='เบอร์โทรศัพท์' onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className='box'>
                            <div className='input-box'>
                                <label>คำนำหน้า</label><br />
                                <div className='prefix'>
                                    <input type="radio" id="นาย" name="prefix" value="นาย" onChange={handleChange} />
                                    <label htmlFor="นาย" >นาย</label>

                                    <input type="radio" id="นางสาว" name="prefix" value="นางสาว" onChange={handleChange} />
                                    <label htmlFor="นางสาว">นางสาว</label>
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>ชื่อ</label><br />
                                <div className='input-Login'>
                                    <FaRegIdCard /><input type='text' name='firstname' placeholder='ชื่อ' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>นามสุกล</label><br />
                                <div className='input-Login'>
                                    <FaRegIdCard /><input type='text' name='lastname' placeholder='นามสุกล' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>หมู่เรียน</label><br />
                                <div className='input-Login'>
                                    <FaUsersRectangle /><input type='text' name='group' placeholder='**/**' onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br /><button><FaUserPlus /> สมัครสมาชิก</button>
                <div className='line-or'>
                    <hr />
                    <span>หรือ</span>
                    <hr />
                </div>
                <div className='btn-register'>
                    มีบัญชีอยู่แล้ว? <Link to={'/login'}>เข้าสู่ระบบ</Link>
                </div>
            </form>

            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton className='ManageAdmin'>
                    <Modal.Title className='ManageAdmin'>ยืนยันการสมัคร</Modal.Title>
                </Modal.Header>
                {loading
                    ? <div className='Loading' style={{ textAlign: 'center', margin: '2rem 0', fontSize: '18px' }}>
                        <Spinner animation="border" variant="Dark" />
                    </div>
                    : <div>
                        <div style={{ textAlign: 'center', margin: '2rem 0', fontSize: '18px', fontFamily: 'Prompt' }}> คุณต้องการที่จะสมัครสมาชิกใช่ หรือไม่</div>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                ไม่
                            </Button>
                            <Button variant="primary" onClick={conFirmRegister}>
                                ใช่
                            </Button>
                        </Modal.Footer>
                    </div>
                }

            </Modal>
        </section >

    )
}

export default Register
