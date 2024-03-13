import React, { useState, useEffect } from 'react'
import MenubarAdmin from '../../layouts/MenubarAdmin'
import { useSelector } from 'react-redux';
import moment from 'moment/min/moment-with-locales'
import { toast } from 'react-toastify';
// Icon
import { FaTrashCan, FaUserPen } from "react-icons/fa6";

// CSS
import '../../../css/style.css'

// functions
import {
    listUser,
    changeStatus,
    changeRole,
    removeUser,
    resetPassword
} from '../../functions/users';


// boostrap
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ManageAdmin = () => {
    const user = useSelector(state => state.user); // ดึงข้อมูลผู้ใช้จาก Redux store
    const [data, setData] = useState([]);
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
    // Modal
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);


    const handleShowModal = (id, studentID, firstname, lastname, group, prefix, email, phone) => {
        setShowModal(true);
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
    };

    const handleChangePassword = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    const handleSaveModal = () => {


        resetPassword(user.token, values.id, { values }) // ส่งเฉพาะรหัสผ่านที่ต้องการเปลี่ยน
            .then((res) => {
                toast.success('แก้ไขข้อมูลสำเร็จ');
                setShowModal(false);
                setValues({ ...values, password: "" })
                loadData(user.token);
                // setTimeout(() => {
                //     window.location.reload();
                // }, 3000);
                // console.log(res.data)

            })
            .catch((err) => {
                console.log(err.response)
                toast.error('แก้ไขข้อมูลไม่สำเร็จ');
            });





    }




    useEffect(() => {
        // code 
        loadData(user.token);
    }, [user.token]);

    const loadData = (authtoken) => {
        // code 
        listUser(authtoken)
            .then((res) => {
                // code
                setData(res.data);
            }).catch((err) => {
                //err
                console.log(err.response.data)
            })
    }
    const handleOnchange = (e, id) => {
        const value = {
            id: id,
            enabled: e.target.checked,
        }
        changeStatus(user.token, value)
            .then((res) => {
                toast.success("เปลี่ยนสถานะสำเร็จ")
                loadData(user.token);
            }).catch((err) => {
                console.log(err.response)
                toast.error('เปลี่ยนสถานะไม่สำเร็จ')

            })


    }
    const handleOnchangeRole = (e, id) => {

        let value = {
            id: id,
            role: e.target.value,
        }
        changeRole(user.token, value)
            .then((res) => {
                toast.success('เปลี่ยนตำแหน่งสำเร็จ')
                loadData(user.token);
            }).catch((err) => {
                toast.error('เปลี่ยนตำแหน่งไม่สำเร็จ')
                console.log(err.response)

            })


    }
    const [deleteID, setDeleteID] = useState('');
    const handleRemove = (id) => {
        setShowDeleteModal(true)
        setDeleteID(id);

    }
    const handleDeleteModal = () => {
        let id = deleteID;
        removeUser(user.token, id)
            .then((res) => {
                toast.success('ลบสำเร็จ')
                loadData(user.token);
                setShowDeleteModal(false)
            }).catch((err) => {
                toast.error('ลบไม่สำเร็จ')
                console.log(err.response)
                setShowDeleteModal(false)
            })

    }

    const roleData = ['admin', 'teacher', 'user']
    return (
        <>
            <section className='ManageAdmin' style={{

                width: '100%'
            }}>
                <div>
                    <div className='container-table'>
                        <h1>ตารางผู้ใช้งาน</h1>
                        <div className='table-Userlist'>


                            <div className='col'>


                                <table className="table table-striped table-hover table-history rounded-2 overflow-hidden">
                                    <thead >
                                        <tr>
                                            <th scope="col" className='id'>รหัสนักศึกษา</th>
                                            <th scope="col" className='id'>คำนำหน้า</th>
                                            <th scope="col" className='id'>ชื่อ</th>
                                            <th scope="col" className='id'>นามสกุล</th>
                                            <th scope="col" className='id'>หมู่เรียน</th>
                                            <th scope="col" className='id'>อีเมล</th>
                                            <th scope="col" className='id'>เบอร์โทรศัพท์</th>
                                            <th scope="col" className='role'>ตำแหน่ง</th>
                                            <th scope="col" className='status'>สถานะ</th>
                                            <th scope="col" className='create'>สร้าง

                                                <p> (M/D/Y) </p>
                                            </th>
                                            <th scope="col" className='update'>อัพเดท

                                                <p> (M/D/Y) </p>
                                            </th>
                                            <th scope="col" className='delete'>ลบ</th>
                                            <th scope="col" className='edit'>แก้</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index}>
                                                <td scope="row" className='id'> {item.studentID}</td>
                                                <td scope="row" className='id'> {item.prefix}</td>
                                                <td scope="row" className='id'> {item.firstname}</td>
                                                <td scope="row" className='id'> {item.lastname}</td>
                                                <td scope="row" className='id'> {item.group}</td>
                                                <td scope="row" className='id'> {item.email}</td>
                                                <td scope="row" className='id'> {item.phone}</td>
                                                <td scope="row" className='role'>
                                                    <Form.Select
                                                        value={item.role}
                                                        style={{ color: item.role === 'admin' ? 'red' : 'green' }}
                                                        onChange={(e) => handleOnchangeRole(e, item._id)}
                                                    >
                                                        {roleData.map((item, index) =>
                                                            <option
                                                                value={item}
                                                                key={index}
                                                                style={{ color: item === 'admin' ? 'red' : 'green' }}>
                                                                {item}
                                                            </option>
                                                        )}
                                                    </Form.Select>
                                                </td>
                                                <td scope="row" className='status'>
                                                    <Form>
                                                        <Form.Check

                                                            type="switch"
                                                            checked={item.enabled}
                                                            onChange={(e) => handleOnchange(e, item._id)}
                                                        />

                                                    </Form>
                                                </td>
                                                <td scope="row" className='create'>

                                                    {moment(item.createdAt).local('th').format('MM/DD/YYYY, LT')}
                                                </td>
                                                <td scope="row" className='update'>

                                                    {moment(item.updatedAt).local('TH').format('MM/DD/YYYY, LT')}
                                                    <br />
                                                    <p> {moment(item.updatedAt).local('TH').startOf(item.updatedAt).fromNow()}</p>
                                                </td>
                                                <td scope="row" className='delete'>
                                                    <FaTrashCan
                                                        onClick={() => handleRemove(item._id)}
                                                    />
                                                </td>
                                                <td scope="row" className='edit'>
                                                    <FaUserPen
                                                        onClick={() => handleShowModal(item._id, item.studentID, item.firstname, item.lastname, item.group, item.prefix, item.email, item.phone)}

                                                    />
                                                </td>
                                            </tr>
                                        )
                                        )}


                                    </tbody>
                                </table>

                            </div>


                        </div>
                    </div>
                </div>

                <Modal show={showModal} onHide={handleCloseModal} >
                    <Modal.Header closeButton className='ManageAdmin'>
                        <Modal.Title className='ManageAdmin'>แก้ไขข้อมูล</Modal.Title>
                    </Modal.Header>
                    <div className='modal-body ManageAdmin'>
                        <div className='inside'>
                            <p>รหัสผ่านใหม่</p>
                            <input type="text" name='password' placeholder="รหัสผ่านใหม่"
                                onChange={handleChangePassword}
                            />
                        </div>
                        <div className='inside'>
                            <p>รหัสนักศึกษา</p>
                            <input type="text" name='StudentID' placeholder={values.StudentID}
                                onChange={handleChangePassword}
                            />
                        </div>
                        <div className='inside prefix'>
                            <p> คำนำหน้า </p>
                            <div className='box'>
                                <div className='prefix'>
                                    <input type="radio" id="นาย" name="Prefix" value="นาย" checked={values.Prefix === 'นาย'} onChange={handleChangePassword} />
                                    <label htmlFor="นาย">นาย</label>
                                </div>
                                <div className='prefix'>
                                    <input type="radio" id="นางสาว" name="Prefix" value='นางสาว' checked={values.Prefix === 'นางสาว'} onChange={handleChangePassword} />
                                    <label htmlFor="นางสาว">นางสาว</label>
                                </div>
                            </div>
                        </div>
                        <div className='inside'>
                            <p>ชื่อ</p>
                            <input type="text" name='FirstName' placeholder={values.FirstName}
                                onChange={handleChangePassword}
                            />
                        </div>
                        <div className='inside'>
                            <p> นามสกุล</p>
                            <input type="text" name='LastName' placeholder={values.LastName}
                                onChange={handleChangePassword}
                            />
                        </div>
                        <div className='inside'>
                            <p> หมู่เรียน </p>
                            <input type="text" name='Group' placeholder={values.Group}
                                onChange={handleChangePassword}
                            />
                        </div>

                        <div className='inside'>
                            <p> อีเมล </p>
                            <input type="text" name='Email' placeholder={values.Email}
                                onChange={handleChangePassword}
                            />
                        </div>
                        <div className='inside'>
                            <p> เบอร์โทรศัพท์ </p>
                            <input type="text" name='Phone' placeholder={values.Phone}
                                onChange={handleChangePassword}
                            />
                        </div>
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            ไม่
                        </Button>
                        <Button variant="primary" onClick={handleSaveModal}>
                            ใช่
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} >
                    <Modal.Header closeButton className='ManageAdmin'>
                        <Modal.Title className='ManageAdmin'>ยืนยันการลบข้อมูล</Modal.Title>
                    </Modal.Header>
                    <div style={{
                        textAlign: 'center',
                        fontSize: '18px',
                        margin: '2rem 0'
                    }}>
                        คุณต้องการลงบข้อมูลผู้ใช้งานใช่ หรือไม่
                    </div>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            ไม่
                        </Button>
                        <Button variant="primary" onClick={handleDeleteModal}>
                            ใช่
                        </Button>
                    </Modal.Footer>
                </Modal>


            </section >
        </>
    )
}

export default ManageAdmin
