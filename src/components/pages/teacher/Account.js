import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// Icon
import { FaUser, FaRegIdCard, FaEnvelope, FaUsersRectangle, FaQuoteLeft, FaPhone, FaCalendarDays, FaCircleInfo, FaImage } from "react-icons/fa6";
// Boostrap
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import {

    resetPassword
} from '../../functions/users';



const Account = () => {


    const user = useSelector((state) => state.user); // ดึงข้อมูลผู้ใช้จาก Redux store
    const [id, setId] = useState('');
    const [studentID, setStudentID] = useState(''); // สร้าง state เพื่อเก็บข้อมูล studentID
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [group, setGroup] = useState('');
    const [prefix, setPrefix] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [loading, setLoading] = useState(false)

    const [checkStudentId, setCheckStudentId] = useState('')
    const [checkEmail, setCheckEmail] = useState('');
    const [checkPhone, setCheckPhone] = useState('');
    const [checkGroup, setCheckGroup] = useState('');
    const [checkPrefix, setCheckPrefix] = useState('');
    const [checkFirstname, setCheckFirstname] = useState('');
    const [checkLastname, setCheckLastname] = useState('');
    const [checkloading, setCheckLoading] = useState(false)


    const memoizedUser = useMemo(() => user, [user]); // Memoized user object

    const [showModal, setShowModal] = useState(false);
    const [showChangeStuID, setShowChangeStuID] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleCloseChangeStuID = () => setShowChangeStuID(false);

    useEffect(() => {
        // ตรวจสอบว่ามีข้อมูลผู้ใช้ (user) แล้วก่อนที่จะดึงข้อมูล studentID
        if (memoizedUser && memoizedUser.id) {
            setStudentID(memoizedUser.studentID); // กำหนดค่า studentID ใน state
            setEmail(memoizedUser.email);
            setPhone(memoizedUser.phone);
            setGroup(memoizedUser.group);
            setPrefix(memoizedUser.prefix);
            setFirstname(memoizedUser.firstname);
            setLastname(memoizedUser.lastname);
            setId(memoizedUser.id);

            setCheckStudentId(memoizedUser.studentID)
            setCheckEmail(memoizedUser.email);
            setCheckPhone(memoizedUser.phone);
            setCheckGroup(memoizedUser.group);
            setCheckPrefix(memoizedUser.prefix);
            setCheckFirstname(memoizedUser.firstname);
            setCheckLastname(memoizedUser.lastname);


        }
    }, [memoizedUser]); // เมื่อ user มีการเปลี่ยนแปลงค่า


    const [values, setValues] = useState({
        id: "",
        password: "",
        StudentID: "",
        FirstName: "",
        LastName: "",
        Group: "",
        Prefix: "",
        Email: "",
        Phone: "",
    })

    const ClickChangData = (e) => {
        e.preventDefault();


        console.log("Test Values");
        console.log(values);



        setValues({
            ...values,
            id: id,
            StudentID: studentID,
            FirstName: firstname,
            LastName: lastname,
            Group: group,
            Prefix: prefix,
            Email: email,
            Phone: phone,

        })
        // console.log(values)
        if (checkStudentId == values.StudentID &&
            checkFirstname == values.FirstName &&
            checkLastname == values.LastName &&
            checkGroup == values.Group &&
            checkPrefix == values.Prefix &&
            checkEmail == values.Email &&
            checkPhone == values.Phone &&
            values.password == ""


        ) {
            toast.error("กรุณากรอกข้อมูล");
        } else {
            setShowModal(true);

        }

    };

    const handleChangeData = (e) => {

        setValues({ ...values, [e.target.name]: e.target.value })

        if (e.target.name === "prefix") {
            setPrefix(e.target.value);
        }
        if (e.target.name === 'studentID') {
            setStudentID(e.target.value);
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }


        if (e.target.name === 'phone') {
            setPhone(e.target.value);
        }
        if (e.target.name === 'group') {
            setGroup(e.target.value);
        }
        if (e.target.name === 'firstname') {
            setFirstname(e.target.value);
        }
        if (e.target.name === 'lastname') {
            setLastname(e.target.value);
        }
        setValues({
            ...values,
            id: id,
            StudentID: studentID,
            FirstName: firstname,
            LastName: lastname,
            Group: group,
            Prefix: prefix,
            Email: email,
            Phone: phone,

        })
        console.log(values.Email)
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        navigate('/');

    };
    const handleSaveDava = (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(values)
        resetPassword(user.token, values.id, { values }) // ส่งเฉพาะรหัสผ่านที่ต้องการเปลี่ยน
            .then((res) => {

                if (checkStudentId != values.StudentID) {
                    setLoading(false)
                    setShowModal(false)
                    setShowChangeStuID(true)
                    toast.success('คุณทำการแก้ไขรหัสเข้าใช้งาน กำลังออกจากระบบ');
                    setValues({ ...values, password: "" })
                    setTimeout(() => {
                        logout();
                    }, 3000);
                    console.log(res.data)

                } else {
                    setLoading(false)
                    setShowModal(false)
                    toast.success('แก้ไขข้อมูลสำเร็จ');
                    setValues({ ...values, password: "" })
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                    console.log(res.data)

                }

            })
            .catch((err) => {
                console.log(err.response)
                toast.error('แก้ไขข้อมูลไม่สำเร็จ');
            });

    }

    return (
        <section className='Account'>

            <form className='Account-Form'>
                <div className='Account-container'>
                    <div className='box'>
                        <h1>ข้อมูลบัญชี</h1>
                        <div className='input-form'>
                            <div className='wrap'>
                                <div className='inputgroup'>
                                    <div className='input-box'>
                                        <label>ชื่อผู้ใช้</label>
                                        <div className='input-Login'>
                                            <FaUser /><input type='text' name='studentID' placeholder={checkStudentId} onChange={handleChangeData} /><br />
                                        </div>
                                    </div>
                                    <div className='input-box'>
                                        <label>รหัสผ่านใหม่</label><br />
                                        <div className='input-Login'>
                                            <FaRegIdCard /><input type='text' name='password' placeholder="รหัสผ่านใหม่" onChange={handleChangeData} />
                                        </div>
                                    </div>
                                </div>
                                <div className='inputgroup'>

                                    <div className='input-box'>
                                        <label>ชื่อ</label><br />
                                        <div className='input-Login'>
                                            <FaRegIdCard /><input type='text' name='firstname' placeholder={checkFirstname} onChange={handleChangeData} />
                                        </div>
                                    </div>
                                    <div className='input-box'>
                                        <label>นามสกุล</label><br />
                                        <div className='input-Login'>
                                            <FaRegIdCard /><input type='text' name='lastname' placeholder={checkLastname} onChange={handleChangeData} />
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <button className='save-data' disabled={checkStudentId == values.StudentID &&
                                checkFirstname == values.FirstName &&
                                checkLastname == values.LastName &&
                                checkGroup == values.Group &&
                                checkPrefix == values.Prefix &&
                                checkEmail == values.Email &&
                                checkPhone == values.Phone &&
                                values.password === "" ||
                                !values.StudentID &&
                                !values.FirstName &&
                                !values.LastName &&
                                !values.Group &&
                                !values.Prefix &&
                                !values.Email &&
                                !values.Phone
                            } onClick={ClickChangData}>บันทึกข้อมูล</button>
                        </div>
                    </div>
                </div>

            </form>

            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton className='ManageAdmin'>
                    <Modal.Title className='ManageAdmin'>แก้ไขข้อมูล</Modal.Title>
                </Modal.Header>
                {loading
                    ? <div className='Loading' style={{ textAlign: 'center', margin: '2rem 0', fontSize: '18px' }}>
                        <Spinner animation="border" variant="Dark" />
                    </div>
                    : <div>
                        <div style={{ textAlign: 'center', margin: '2rem 0', fontSize: '18px', fontFamily: 'Prompt' }}> คุณต้องการที่จะเปลี่ยนข้อมูลใช่ หรือ ไม่</div>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                ไม่
                            </Button>
                            <Button variant="primary" onClick={handleSaveDava}>
                                ใช่
                            </Button>
                        </Modal.Footer>
                    </div>
                }

            </Modal>
            <Modal show={showChangeStuID} onHide={handleCloseChangeStuID} >
                <Modal.Header closeButton className='ManageAdmin'>
                    <Modal.Title className='ManageAdmin'>แจ้งเตือน</Modal.Title>
                </Modal.Header>
                <div className='modal-body ManageAdmin'>
                    คุณทำการแก้ไขรหัสเข้าใช้งาน ระบบกำลังส่งคุณไปยังหน้าเข้าสู่ระบบ
                </div>

            </Modal>
        </section>

    )
}

export default Account
