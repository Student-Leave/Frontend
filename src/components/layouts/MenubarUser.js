import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

// CSS
import '../../css/style.css'

const MenubarUser = () => {
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
        <section className='navUser'>
            <Nav variant="underline" style={{ position: 'fixed', top: '0' }}>
                <Nav.Item>
                    <Nav.Link href="/user/index">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/user/account">Manage Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={logout} >Logout</Nav.Link>
                </Nav.Item>
            </Nav>

            <Nav variant="underline" style={{ opacity: '0' }}>
                <Nav.Item>
                    <Nav.Link href="/user/index">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/user/account">Manage Users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={logout} >Logout</Nav.Link>
                </Nav.Item>
            </Nav>
        </section>

    )
}

export default MenubarUser
