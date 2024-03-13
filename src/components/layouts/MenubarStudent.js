import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../../css/style.css'; // ตรวจสอบว่าเรียกใช้ไฟล์ CSS ให้ถูกต้อง

const MenubarStudent = () => {
    const user = useSelector((state) => state.user); // ดึงข้อมูลผู้ใช้จาก Redux store
    const [id, setId] = useState(''); // สร้าง state เพื่อเก็บข้อมูล studentID
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const memoizedUser = useMemo(() => user, [user]); // Memoized user object


    const handleChangeName = (e) => {
        if (!e.target.value) {
            setFirstname(e.target.value.firstname);
            setLastname(e.target.value.lastname);
        }


    }
    useEffect(() => {
        // ตรวจสอบว่ามีข้อมูลผู้ใช้ (user) แล้วก่อนที่จะดึงข้อมูล studentID
        if (memoizedUser && memoizedUser.studentID) {
            setId(memoizedUser._id);
            setFirstname(memoizedUser.firstname);
            setLastname(memoizedUser.lastname);
        }
    }, [memoizedUser]); // เมื่อ user มีการเปลี่ยนแปลงค่า




    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation(); // ใช้ hook useLocation เพื่อรับค่าเส้นทางปัจจุบัน
    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        navigate('/');

    };

    return (
        <section className='nav-menu' style={{
            position: 'sticky',
            top: '0'
        }}>
            <nav className="navbar navbar-expand-lg " >
                <div className="container-fluid " style={{ padding: '0 10%' }}>
                    <div className="navbar-brand" >
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='nav-item'>
                                <a className={`nav-link ${location.pathname === '/user/leavepage' ? 'active' : ''}`} aria-current="page" href="/user/leavepage">Leave Page</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname === '/user/account' ? 'active' : ''}`} href="/user/account">Account</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname === '/user/history' ? 'active' : ''}`} href="/user/history">Leave History</a>
                            </li>

                        </ul>
                        <span className="navbar-text">
                            <input className="nav-link" type='text' name='Firstname' placeholder='ชื่อจริง' value={firstname} onChange={handleChangeName} disabled
                                style={{
                                    border: '0',

                                    background: "none",
                                    width: '135px',
                                    fontSize: '18px',
                                    fontFamily: 'Prompt',
                                    textAlign: 'left'
                                }}

                            />
                        </span>
                        <span className="navbar-text">
                            <input className="nav-link" type='text' name='Lastname' placeholder='นามสุกล' value={lastname} onChange={handleChangeName} disabled
                                style={{
                                    border: '0',

                                    background: "none",
                                    width: '135px',
                                    fontSize: '18px',
                                    fontFamily: 'Prompt',
                                    textAlign: 'left'
                                }}

                            />
                        </span>
                        <span className="navbar-text">
                            <a className="nav-link" href="#" onClick={logout}>Logout</a>
                        </span>
                    </div>
                </div>
            </nav>


            {/* <Nav variant="underline" style={{ position: 'fixed', top: '0', zIndex: '999' }}>
                <Nav.Item>
                    <NavLink to="/user/leavepage" className={(navData) => (navData.isActive ? "nav-link active" : 'nav-link')}>Leave Page</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/user/account" className={(navData) => (navData.isActive ? "nav-link active" : 'nav-link')}>Account</NavLink>
                </Nav.Item>
                <Nav.Item className='logout'>
                    <Nav.Link className='nav-link' onClick={logout} >Logout</Nav.Link>
                </Nav.Item>
            </Nav>
            <Nav variant="underline" style={{ opacity: '0' }}>
                <Nav.Item>
                    <NavLink to="/user/leavepage" className={(navData) => (navData.isActive ? "nav-link active" : 'nav-link')}>Leave Page</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/user/account" className={(navData) => (navData.isActive ? "nav-link active" : 'nav-link')}>Account</NavLink>
                </Nav.Item>
                <Nav.Item className='logout'>
                    <Nav.Link className='nav-link' onClick={logout} >Logout</Nav.Link>
                </Nav.Item>
            </Nav> */}
        </section>
    );
};

export default MenubarStudent;
