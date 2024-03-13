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

const History = () => {
    const [leaveData, setLeaveData] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.user); // ดึงข้อมูลผู้ใช้จาก Redux store
    const [id, setId] = useState(''); // สร้าง state เพื่อเก็บข้อมูล studentID
    const [studentID, setStudentID] = useState(''); // สร้าง state เพื่อเก็บข้อมูล studentID


    const memoizedUser = useMemo(() => user, [user]); // Memoized user object
    useEffect(() => {
        if (memoizedUser && memoizedUser.studentID) {
            setStudentID(memoizedUser.studentID);
        }
    }, [memoizedUser]);

    useEffect(() => {
        if (studentID) {
            fetchData();
        }
    }, [studentID]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyAhJyYP0dvC8zlncQYb5eZV0hbswGrlvq3whnJPr8sXxOnWkxKixDFIC5dwlNLo4WT4A/exec');
            const data = await response.json();
            setLeaveData(data.filter(item => item.studentID === studentID)); // กรองข้อมูลเฉพาะที่ studentID เท่ากับ state studentID
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };
    const sortedLeaveData = leaveData.sort((a, b) => new Date(b.uploadtime) - new Date(a.uploadtime));
    return (
        <section className='history'>
            <div className='table-history'>

                <h1>ตารางประวัติการลา</h1>
                <div className='container-table'>

                    {loading ? (
                        <h4 style={{
                            display: 'flex',
                            margin: '5px auto',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}><p style={{
                            marginRight: '15px',

                        }}>กำลังโหลดข้อมูลตาราง</p><Spinner /></h4>
                    ) : (
                        <table className="table table-striped table-hover table-history rounded-2 overflow-hidden">
                            <thead>
                                <tr>
                                    <th>รหัสนักศึกษา</th>
                                    <th>เบอร์โทรศัพท์</th>
                                    <th>หมู่เรียน</th>
                                    <th>คำนำหน้าชื่อ</th>
                                    <th>ชื่อ</th>
                                    <th>นามสกุล</th>
                                    <th>ประเภทการลา</th>
                                    <th>เบอร์โทรศัพท์ฉุกเฉิน</th>
                                    <th>วันที่เริ่มลา</th>
                                    <th>วันที่สิ้นสุด</th>
                                    <th>รายละเอียดการลา</th>

                                </tr>
                            </thead>
                            <tbody>
                                {sortedLeaveData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.studentID}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.group}</td>
                                        <td>{item.prefix}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.leavetype}</td>
                                        <td>{item.emgphone}</td>
                                        <td>{item.firstdate}</td>
                                        <td>{item.lastdate}</td>
                                        <td>{item.detailleave}</td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </section>
    )
}

export default History
