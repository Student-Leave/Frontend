import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

// CSS
import '../../css/style.css'

const MenubarAdmin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        navigate('/');

    };
    return (
        <section className='nav-menu'>
            <Nav variant="underline" style={{ position: "fixed", top: '0' }} >
                <Nav.Item>
                    <NavLink to="/admin/mangeadmin" className={(navData) => (navData.isActive ? "nav-link active" : 'nav-link')}>Dashboard</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/admin/adduser" className={(navData) => (navData.isActive ? "nav-link active" : 'nav-link')}>Add User</NavLink>
                </Nav.Item>
                <Nav.Item className='logout' >
                    <Nav.Link onClick={logout} >Logout</Nav.Link>
                </Nav.Item>
            </Nav>

        </section>

    )
}

export default MenubarAdmin
