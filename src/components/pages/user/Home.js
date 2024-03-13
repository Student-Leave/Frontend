import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
// Icon
import { FaUser, FaRegIdCard, FaEnvelope, FaUsersRectangle, FaQuoteLeft, FaPhone, FaCalendarDays, FaCircleInfo, FaImage } from "react-icons/fa6";
// Boostrap
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const Home = () => {
    const [accept1Checked, setAccept1Checked] = useState(false);
    const [accept2Checked, setAccept2Checked] = useState(false);
    const user = useSelector((state) => state.user); // ดึงข้อมูลผู้ใช้จาก Redux store
    const [id, setId] = useState(''); // สร้าง state เพื่อเก็บข้อมูล studentID
    const [studentID, setStudentID] = useState(''); // สร้าง state เพื่อเก็บข้อมูล studentID
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [group, setGroup] = useState('');
    const [prefix, setPrefix] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [loading, setLoading] = useState(false)

    const [obj, setObj] = useState([]);
    // modal
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const [showModalPic, setShowModalPic] = useState(false);
    const handleCloseModalPic = () => setShowModalPic(false);


    const memoizedUser = useMemo(() => user, [user]); // Memoized user object

    const handleChangeName = (e) => {
        if (!e.target.value) {
            setStudentID(e.target.value.studentID);
            setEmail(e.target.value.email);
            setPhone(e.target.value.phone);
            setGroup(e.target.value.group);
            setPrefix(e.target.value.prefix);
            setFirstname(e.target.value.firstname);
            setLastname(e.target.value.lastname);
        }


    }
    useEffect(() => {
        // ตรวจสอบว่ามีข้อมูลผู้ใช้ (user) แล้วก่อนที่จะดึงข้อมูล studentID
        if (memoizedUser && memoizedUser.studentID) {
            setId(memoizedUser._id);
            setStudentID(memoizedUser.studentID); // กำหนดค่า studentID ใน state
            setEmail(memoizedUser.email);
            setPhone(memoizedUser.phone);
            setGroup(memoizedUser.group);
            setPrefix(memoizedUser.prefix);
            setFirstname(memoizedUser.firstname);
            setLastname(memoizedUser.lastname);
        }
    }, [memoizedUser]); // เมื่อ user มีการเปลี่ยนแปลงค่า


    const ApiEndPointUrl = "https://script.google.com/macros/s/AKfycbyYax6S5KFFHxkC0y1PNnzm7HyNzz2aoapXW71dKRMPjJwpeq44wjEkb0hzaCCwujj6/exec";
    const [imageUrl, setImageUrl] = useState('');
    const [file, setFile] = useState(null);

    const handleChangeImage = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile || !selectedFile.type.startsWith('image/')) {
            // ใส่โค้ดที่จะแจ้งเตือนผู้ใช้เลือกไฟล์ภาพ
            return;
        }

        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };


    const handleAccept1Change = () => {
        setAccept1Checked(!accept1Checked);
    }

    const handleAccept2Change = () => {
        setAccept2Checked(!accept2Checked);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (file) {
            const formData = new FormData(e.target);
            const StudentID = formData.get('StudentID');
            const Phone = formData.get('Phone');
            const Group = formData.get('Group');
            const Prefix = formData.get('Prefix');
            const Firstname = formData.get('Firstname');
            const Lastname = formData.get('Lastname');
            const LeaveType = formData.get('LeaveType');
            const EmgPhone = formData.get('EmgPhone');
            const FirstDate = formData.get('FirstDate');
            const LastDate = formData.get('LastDate');
            const DetailLeave = formData.get('DetailLeave');

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split("base64,")[1];
                const obj = {
                    base64: base64,
                    type: file.type,
                    name: file.name,
                    StudentID: StudentID,
                    Phone: Phone,
                    Group: Group,
                    Prefix: Prefix,
                    Firstname: Firstname,
                    Lastname: Lastname,
                    LeaveType: LeaveType,
                    EmgPhone: EmgPhone,
                    FirstDate: FirstDate,
                    LastDate: LastDate,
                    DetailLeave: DetailLeave,
                };


                if (EmgPhone && EmgPhone.length > 9) {
                    if (FirstDate && LastDate) {
                        if (DetailLeave) {
                            if (base64) {

                                if (accept1Checked && accept2Checked) {
                                    // ทำรายการต่อไป
                                    setShowModalPic(true)
                                    setLoading(false)
                                    setObj(obj)
                                } else {
                                    toast.error('กรุณากดยอมรับเงื่อนไข');
                                }


                            } else {
                                toast.error('กรุณาใส่รูปหลักฐาน')
                            }
                        } else {
                            toast.error('กรุณากรอกรายละเอียด')
                        }
                    } else {
                        toast.error('กรุณากรอกวันที่')
                    }
                } else {
                    toast.error('กรุณากรอกเบอร์โทรศัพท์ฉุกเฉิน')
                }

            };
            reader.readAsDataURL(file);
        } else {
            const formData = new FormData(e.target);
            const StudentID = formData.get('StudentID');
            const Phone = formData.get('Phone');
            const Group = formData.get('Group');
            const Prefix = formData.get('Prefix');
            const Firstname = formData.get('Firstname');
            const Lastname = formData.get('Lastname');
            const LeaveType = formData.get('LeaveType');
            const EmgPhone = formData.get('EmgPhone');
            const FirstDate = formData.get('FirstDate');
            const LastDate = formData.get('LastDate');
            const DetailLeave = formData.get('DetailLeave');
            const obj = {
                StudentID: StudentID,
                Phone: Phone,
                Group: Group,
                Prefix: Prefix,
                Firstname: Firstname,
                Lastname: Lastname,
                LeaveType: LeaveType,
                EmgPhone: EmgPhone,
                FirstDate: FirstDate,
                LastDate: LastDate,
                DetailLeave: DetailLeave,

            };
            if (EmgPhone && EmgPhone.length > 9) {
                if (FirstDate && LastDate) {
                    if (DetailLeave) {
                        if (LeaveType != "อื่นๆ" && LeaveType != "ลาป่วย") {
                            toast.error('กรุณาใส่รูปหลักฐาน')
                        } else {
                            toast.error('กรุณาใส่รูปหลักฐาน')

                        }
                    } else {
                        toast.error('กรุณากรอกรายละเอียด')
                    }
                } else {
                    toast.error('กรุณากรอกวันที่')
                }
            } else {
                toast.error('กรุณากรอกเบอร์โทรศัพท์ฉุกเฉิน555')
            }



        }
    };
    const clicksendForm = () => {
        handleConfirm(obj)
    }
    const clicksendFormPic = () => {
        handleConfirmPic(obj)
    }
    const handleConfirm = () => {

        setLoading(true)
        fetch(ApiEndPointUrl, {
            method: "POST",
            body: JSON.stringify(obj)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // console.log(data);
                setLoading(false)
                setShowModal(false)
                toast.success("ส่งแบบฟอร์มสำเร็จ");
                setTimeout(() => {
                    window.location.reload();
                }, 5000); // 5000 มิลลิวินาที = 5 วินาที
            })
            .catch(error => {
                setLoading(false)
                console.error('Error:', error);
                toast.error("ส่งแบบฟอร์มไม่สำเร็จ");
                // Handle error here
            });
    }
    const handleConfirmPic = (obj) => {
        setLoading(true)
        fetch(ApiEndPointUrl, {
            method: "POST",
            body: JSON.stringify(obj)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // console.log(data);
                setLoading(false)
                setShowModalPic(false)
                toast.success("ส่งแบบฟอร์มสำเร็จ");
                setTimeout(() => {
                    window.location.reload();
                }, 3000); // 5000 มิลลิวินาที = 5 วินาที
            })
            .catch(error => {
                setLoading(false)
                console.error('Error:', error);
                toast.error("ส่งแบบฟอร์มไม่สำเร็จ");
            });
    }



    return (
        <section className='LeavForm'>

            <form className='LeavePage' onSubmit={handleSubmit}>

                <div className='Account' style={{ display: 'none' }}>
                    <div className='container'>
                        <div className='box'>
                            <h1>ข้อมูลนักศึกษา</h1>
                            <div className='input-form'>
                                <div className='wrap'>
                                    <div className='inputgroup'>
                                        <div className='input-box'>
                                            <label>รหัสนักศึกษา</label>
                                            <div className='input-Login'>
                                                <FaUser /><input type='number' name='StudentID' placeholder='รหัสนักศึกษา' value={studentID} onChange={handleChangeName} /><br />
                                            </div>
                                        </div>

                                        <div className='input-box'>
                                            <label>อีเมล</label><br />
                                            <div className='input-Login'>
                                                <FaEnvelope /><input type='email' name='Email' placeholder='อีเมล' value={email} onChange={handleChangeName} />
                                            </div>
                                        </div>

                                        <div className='input-box'>
                                            <label>เบอร์โทรศัพท์</label><br />
                                            <div className='input-Login'>
                                                <FaPhone /><input type='number' name='Phone' placeholder='เบอร์โทรศัพท์' value={phone} onChange={handleChangeName} />
                                            </div>
                                        </div>
                                        <div className='input-box'>
                                            <label>หมู่เรียน</label><br />
                                            <div className='input-Login'>
                                                <FaUsersRectangle /><input type='text' name='Group' placeholder='**/**' value={group} onChange={handleChangeName} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='inputgroup'>
                                        <div className='input-box'>
                                            <label>คำนำหน้า</label><br />
                                            <div className='prefix'>
                                                <div>
                                                    <input type="radio" id="นาย" name="Prefix" value={prefix} required checked={prefix === 'นาย'} onChange={handleChangeName} />
                                                    <label htmlFor="นาย" >นาย</label>
                                                </div>
                                                <div>
                                                    <input type="radio" id="นางสาว" name="Prefix" value={prefix} checked={prefix === 'นางสาว'} onChange={handleChangeName} />
                                                    <label htmlFor="นางสาว">นางสาว</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='input-box'>
                                            <label>ชื่อ</label><br />
                                            <div className='input-Login'>
                                                <FaRegIdCard /><input type='text' name='Firstname' placeholder='ชื่อจริง' value={firstname} onChange={handleChangeName} />
                                            </div>
                                        </div>
                                        <div className='input-box'>
                                            <label>นามสกุล</label><br />
                                            <div className='input-Login'>
                                                <FaRegIdCard /><input type='text' name='Lastname' placeholder='นามสุกล' value={lastname} onChange={handleChangeName} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='LeaveForm'>
                    <div className='container'>
                        <div className='box'>
                            <h1>ข้อมูลการลา</h1>
                            <div className='input-form'>
                                <div className='wrap-leave'>
                                    <div className='inputgroup'>
                                        <div className='input-box'>
                                            <label htmlFor="leaveType">ประเภท</label>
                                            <div className='input-Login'>
                                                <FaQuoteLeft /> <select
                                                    id="leaveType"
                                                    className=""
                                                    name='LeaveType'

                                                >
                                                    <option value="ลากิจ">ลากิจ</option>
                                                    <option value="ลาป่วย">ลาป่วย</option>

                                                    <option value="ลาเข้ารับตรวจเลือกทหาร">
                                                        ลาเข้ารับตรวจเลือกทหาร
                                                    </option>
                                                    <option value="ลาประกอบพิธีทางศาสนา">
                                                        ลาประกอบพิธีทางศาสนา
                                                    </option>
                                                    <option value="อื่นๆ">อื่นๆ</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='inputgroup'>

                                        <div className='input-box'>
                                            <label>เบอร์โทรศัพท์ฉุกเฉิน</label><br />
                                            <div className='input-Login'>
                                                <FaPhone /><input type='number' name='EmgPhone' placeholder='เบอร์โทรศัพท์ฉุกเฉิน' />
                                            </div>
                                        </div>


                                    </div>

                                </div>
                                <div className='wrap-leave'>
                                    <div className='inputgroup'>
                                        <div className='input-box'>
                                            <label>เริ่มวันที่</label><br />
                                            <div className='input-Login'>
                                                <FaCalendarDays /><input
                                                    type="date"
                                                    name="FirstDate"
                                                    id="FirstDate"
                                                    className="float-right input-LeavePage "
                                                    min={(new Date(new Date().getTime())).toISOString().split('T')[0]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='inputgroup'>
                                        <div className='input-box'>
                                            <label>ถึงวันที่</label><br />
                                            <div className='input-Login'>
                                                <FaCalendarDays /><input
                                                    type="date"
                                                    name="LastDate"
                                                    id="LastDate"
                                                    className="float-right input-LeavePage "
                                                    min={(new Date(new Date().getTime())).toISOString().split('T')[0]}
                                                // min={(new Date(new Date().getTime() - (1 * 24 * 60 * 60 * 1000))).toISOString().split('T')[0]}


                                                />

                                            </div>
                                        </div>


                                    </div>

                                </div>
                                <div className='wrap bottom'>
                                    <div className='inputgroup bottom-form'>
                                        <div className='bottombox'>
                                            <label>รายละเอียด</label><br />
                                            <div className='input-Login'>
                                                <FaCircleInfo /><input type='text' name='DetailLeave' placeholder='รายละเอียด' />
                                            </div>
                                        </div>
                                        <div className='bottombox'>
                                            <label>หลักฐาน</label><br />
                                            <div className='input-Login'>
                                                <FaImage /> <input
                                                    type='file'
                                                    name='Evidence'
                                                    placeholder='รูปหลักฐานการลา'
                                                    onChange={handleChangeImage} // เพิ่ม onChange event listener
                                                />
                                            </div>




                                            <div className='bottombox'>
                                                <div className='d-flex accept'>
                                                    <input className='acceptbox' type='checkbox' name='accept1' id='accept1' onChange={handleAccept1Change} />
                                                    <span htmlFor="accept1">
                                                        ข้าพเจ้าสัญญาว่าจะติดตามงานในคาบเรียน และดำเนินการเองให้เรียบร้อยตามกำหนดเวลา
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='bottombox'>
                                                <div className='d-flex accept'>
                                                    <br /><input className='acceptbox' type='checkbox' name='accept2' id='accept2' onChange={handleAccept2Change} />
                                                    <span htmlFor="accept2">
                                                        ข้าพเจ้าขอรับรองว่าเป็นความจริงทุกประการ
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className='sendLeave' type='submit'>ส่งแบบฟอร์ม</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </form >
            <Modal show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton className='ManageAdmin'>
                    <Modal.Title className='ManageAdmin'>ยืนยันการส่งฟอร์ม</Modal.Title>
                </Modal.Header>
                {loading
                    ? <div className='Loading' style={{ textAlign: 'center', margin: '2rem 0', fontSize: '18px' }}>
                        <Spinner animation="border" variant="Dark" />
                    </div>
                    : <div>
                        <div style={{ textAlign: 'center', margin: '2rem 0', fontSize: '18px', fontFamily: 'Prompt' }}> คุณต้องการส่งฟอร์มการลาหรือไม่</div>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                ไม่
                            </Button>
                            <Button variant="primary" onClick={clicksendForm}>
                                ใช่
                            </Button>
                        </Modal.Footer>
                    </div>
                }

            </Modal>
            <Modal show={showModalPic} onHide={handleCloseModalPic} >
                <Modal.Header closeButton className='ManageAdmin'>
                    <Modal.Title className='ManageAdmin'>ยืนยันการส่งฟอร์ม</Modal.Title>
                </Modal.Header>
                {loading
                    ? <div className='Loading' style={{ textAlign: 'center', margin: '2rem 0', fontSize: '18px' }}>
                        <Spinner animation="border" variant="Dark" />
                    </div>
                    : <div>
                        <div style={{ textAlign: 'center', margin: '2rem 0', fontSize: '18px', fontFamily: 'Prompt' }}> คุณต้องการส่งฟอร์มการลาหรือไม่</div>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModalPic}>
                                ไม่
                            </Button>
                            <Button variant="primary" onClick={clicksendFormPic}>
                                ใช่
                            </Button>
                        </Modal.Footer>
                    </div>
                }


            </Modal>

        </section >
    )
}

export default Home
