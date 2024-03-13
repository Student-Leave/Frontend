// rafce
import React, { useState } from 'react'
import { toast } from 'react-toastify';

// functions
import { adduser } from '../../functions/auth';
import { Link, useNavigate } from 'react-router-dom';

// Icon
import { FaLock, FaUser, FaUserPlus, FaRegIdCard, FaEnvelope, FaUsersRectangle } from "react-icons/fa6";
// CSS
import '../../../css/style.css'
const AddUser = () => {


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
        role: ''

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

        if (!value.studentID) {
            toast.error('กรุณากรอกชื่อผู้ใช้')
        } else {
            if (value.password.length < 8) {
                toast.error('พาสเวิร์ดต้องมี 8 ตัวอักษรขึ้นไป')
            } else {
                adduser(value)
                    .then(res => {
                        console.log(res.data);
                        toast.success(res.data);
                        window.location.reload()
                    }).catch((err) => {
                        console.log(err.response.data);
                        toast.error(err.response.data);
                    })
            }
        }
    }


    return (

        <section className='addUser' >
            <form onSubmit={handleSubmit}>
                <h1>เพิ่มผู้ใช้</h1>
                <div className='input-form'>
                    <div className='wrap'>
                        <div className='box'>
                            <div className='input-box'>
                                <label>ชื่อผู้ใช้</label>
                                <div className='input-Login'>
                                    <FaUser />  <input type='text' name='studentID' placeholder='*นักศึกษากรอกรหัสนักศึกษา' onChange={handleChange} /> <br />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>รหัสผ่าน</label>
                                <div className='input-Login'>
                                    <FaLock /><input type='password' name='password' placeholder='รหัสผ่าน' onChange={handleChange} /><br />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>อีเมล</label><br />
                                <div className='input-Login'>
                                    <FaEnvelope /><input type='text' name='email' placeholder='อีเมล' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>คำนำหน้า</label><br />
                                <div className='prefix'>
                                    <input type="radio" id="นาย" name="prefix" value="นาย" required onChange={handleChange} />
                                    <label htmlFor="นาย" >นาย</label>

                                    <input type="radio" id="นางสาว" name="prefix" value="นางสาว" onChange={handleChange} />
                                    <label htmlFor="นางสาว">นางสาว</label>
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>ชื่อ</label><br />
                                <div className='input-Login'>
                                    <FaRegIdCard /><input type='text' name='firstname' placeholder='ชื่อจริง' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>นามสุกล</label><br />
                                <div className='input-Login'>
                                    <FaRegIdCard /><input type='text' name='lastname' placeholder='นามสุกล' onChange={handleChange} />
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
                                <label>หมู่เรียน</label><br />
                                <div className='input-Login'>
                                    <FaUsersRectangle /><input type='text' name='group' placeholder='**/**' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='input-box'>
                                <label>ตำแหน่ง</label><br />
                                <div className='input-Login'>
                                    <FaUser />  <select
                                        id="leaveType"
                                        className=""
                                        name='role'
                                        style={{
                                            border: '0',
                                            borderLeft: "1px solid #000",
                                            marginLeft: '7px',
                                            paddingLeft: '7px',
                                            width: '100%',
                                            outline: 'none'
                                        }}
                                        onChange={handleChange}

                                    >

                                        <option value="admin">admin</option>
                                        <option value="teacher">teacher</option>
                                        <option value="user">user</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br /><button><FaUserPlus />เพิ่มผู้ใช้</button>

            </form>
        </section >

    )
}

export default AddUser
