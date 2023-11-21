import next from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { categories, cart, cartGet, logout } from '../api';
import { setCart, setUser } from '../store/userSlice';

const Navbar = ({ cartItems }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [pages, setPages] = useState([])
    const { user, cart } = useSelector(state => state.user);
    const dispatch = useDispatch()
    const router = useRouter();

    const logoutUser = async () => {
        try {
            const {data} = await logout();
            if (!data.success) {
                return;
            }
            toast.success(data.msg)
            dispatch(setUser({}))
            dispatch(setCart(0))
            router.push('/login')
        } catch (err) {
            return;
        }
    }

    useEffect(() => {
        if (user._id) {
            setIsLoggedIn(true)
        }
    }, [user])

    useEffect(() => {
        const callNow = async () => {
            try {
                const { data } = await categories()
                if (!data.success) {
                    return;
                }
                setPages(data.categories)
            } catch (err) {
                return;
            }
        }
        callNow();
    }, [])

    useEffect(() => {
        const callNow = async () => {
            if (user._id) {
                const { data } = await cartGet(user._id)
                if (!data.success) {
                    return;
                }
                console.log(data);
                dispatch(setCart(data.data.length))
            }
        }
        callNow();
    }, [user]);


    return (
        <header>
            <div className="top-header">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className="m-0 glozmy">Welcome to A & N Closet</p>
                        </div>
                        <div className="d-flex">
                            <p className="m-0 px-2 eng">English</p>
                            {
                                isLoggedIn ?
                                    <>
                                        <p className="m-0 px-2 glozmy dropdown-toggle" data-bs-toggle="dropdown" style={{ cursor: "pointer" }}>{user.name}</p>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li className="dropdown-item text-dark"><Link href="/orders" className='text-dark'>My Orders</Link></li>
                                            <li className="dropdown-item text-dark"><Link href="/profile" className='text-dark'>My profile</Link></li>
                                            <li className="dropdown-item text-dark" onClick={logoutUser}><div className='text-danger'>Logout</div></li>
                                        </ul>
                                    </>
                                    : <>
                                        <Link href="/login">
                                            <p className="m-0 px-2 glozmy">Login</p>
                                        </Link>
                                        <Link href="/register">
                                            <p className="m-0 px-2 glozmy">Register</p>
                                        </Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="mid-header py-3">
                <div className="container d-flex justify-content-between">
                    <Link href="/">
                        <Image src="/images/logo.png" height="60" width="250" alt="logo"></Image>
                    </Link>
                    <div className="d-flex align-items-center">
                        {/* <div className="nav-search me-4 me-lg-5 ms-2">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search Here ..." />
                                <span className="input-group-text bg-primary text-white" id="basic-addon2">
                                    <Image src="/images/search.png" alt="search" className="img-fluid" width='21' height='21' />
                                </span>
                            </div>
                        </div> */}
                        <Link href={`/cart`}>
                            <div className="nav-cart d-flex" style={{ cursor: 'pointer' }}>
                                <div className="position-relative me-2">
                                    <Image height="44" width='47' src="/images/cartIcon.png" alt="cartIcon" className="img-fluid" />
                                    <span
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                                        {cart} </span>
                                </div>
                                <div className="ms-2 cart-extra">
                                    <h5 className="mb-0">My Cart</h5>
                                    <p className="m-0 text-muted">Cart Items({cart})</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="end-header bg-dark d-flex">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <ul className="nav-header ">
                            <li className="close display-4 fw-bold">&times;</li>
                            {
                                pages[0] && pages.map(item => {
                                    return (
                                        <Link href={`/${item._id}`} key={item._id}>
                                            <li>{item.name}</li>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                        <div data-feather="menu" className="nav-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#fff" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </div>
                        <div className="d-flex call align-items-center">
                            <span className="call-icon"><Image height="19" width="19" src="/images/call.png" alt="call" /></span>
                            <span className="text-white mx-2">+91 1231 121 311</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;