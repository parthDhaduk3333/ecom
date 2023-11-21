import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../components/Title';
import Image from 'next/image';
import { addOrder, addToCart, cart, cartGet, deleteCart } from '../api';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';
import useRazorpay from "react-razorpay";
import Head from 'next/head';
import { setCart } from '../store/userSlice';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const { user, fetched } = useSelector(state => state.user);
    const [discount, setDiscount] = useState(0)
    const [total, setTotal] = useState(0)
    const Razorpay = useRazorpay();
    const router = useRouter();
    const dispatch = useDispatch();
    useEffect(() => {
        if (fetched) {
            if (!user.name) {
                router.push('/login');
            }
            console.log(user.name);
        }
    }, [user]);
    useEffect(() => {
        const callNow = async () => {
            if (user._id) {
                const { data } = await cartGet(user._id)
                if (!data.success) {
                    return;
                }
                console.log(data);
                setCartItems(data.data);
                dispatch(setCart(data.data.length))
            }
        }
        callNow();
    }, [user]);

    useEffect(() => {
        const callNow = async () => {
            let totalAmount = 0
            await Promise.all(cartItems.map(async item => {
                totalAmount = totalAmount + (item?.product?.product?.price * item?.product?.item)
            }))
            if (totalAmount > 5000 && totalAmount < 10000) {
                setDiscount(500)
            } else if (totalAmount > 10000 && totalAmount < 15000) {
                setDiscount(1000)
            } else if (totalAmount > 15000 && totalAmount < 20000) {
                setDiscount(1500)
            } else if (totalAmount > 20000) {
                setDiscount(2000)
            } else {
                setDiscount(0)
            }
            setTotal(totalAmount)
        }
        callNow();
    }, [cartItems])


    const addItem = async (product, size) => {
        try {
            const { data } = await addToCart({ product, size });
            if (!data.success) {
                return;
            }
            toast.success(data.msg);
            setCartItems(data.cart)
            dispatch(setCart(data.cart.length))
        } catch (err) {
        }
    }
    const removeItem = async (product, size) => {
        try {
            const { data } = await deleteCart({ product, size });
            if (!data.success) {
                return;
            }
            toast.success(data.msg);
            setCartItems(data.cart);
            dispatch(setCart(data.cart.length))
        } catch (err) {
        }
    }
    const handlePayment = () => {
        const options = {
            key: "rzp_test_sUtUFxo62P92W0",
            amount: ((total * 100) + (user?.country?.charge * 100))-(discount * 100),
            currency: "INR",
            name: "A & N Closet",
            prefill: {
                name: user?.name,
                email: user?.email,
                contact: user?.mobile
            },
            theme: "#009FE3",
            handler: function (response) {
                let cartArray = [];
                cartItems.map(item => {
                    cartArray.push(item._id)
                })
                const callNow = async () => {
                    try {
                        const { data } = await addOrder({ carts: cartArray, payment: response.razorpay_payment_id })
                        if (!data.success) {
                            return;
                        }
                        toast.success(data.msg)
                        setCartItems([])
                    } catch (err) {
                        return;
                    }
                }
                callNow();
                console.log(response.razorpay_payment_id)
            },
        }
        const rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', (res) => {
            console.log(res)
        })
        rzp1.open()
    }
    return (
        <>
            <Head>
                <title>A & N Closet | Cart</title>
            </Head>
            <Navbar cartItem={cartItems}></Navbar>
            <section className='m-100'>
                <Title title={'My Cart'}></Title>
                <div className="container">
                    <div className="row">
                        {
                            cartItems[0] ? cartItems.map(item => {
                                return (
                                    <div className="col-lg-4 col-md-6 my-2" key={item._id}>
                                        <div className="d-flex align-items-center">
                                            <div className="cartImage ">
                                                <div className="w-100 h-100 position-relative">
                                                    <Image layout='fill' src={item?.product?.product?.thumb} alt="" className="img-fluid w-100" />
                                                </div>
                                            </div>
                                            <div className="ms-2">
                                                <p className="m-0">{item?.product?.product?.name}</p>
                                                <p className="m-0 text-muted">Size : {item?.product?.size}</p>
                                                <div className="my-2 product-counter d-flex justify-content-between px-2" style={{ width: 100 }}>
                                                    <span onClick={e => addItem(item?.product?.product?._id, item?.product?.size)} style={{ cursor: "pointer" }}>
                                                        +
                                                    </span>
                                                    <span>
                                                        {item?.product?.item}
                                                    </span>
                                                    <span onClick={e => removeItem(item?.product?.product?._id, item?.product?.size)} style={{ cursor: "pointer" }}>
                                                        -
                                                    </span>
                                                </div>
                                                <h5 className="fw-bold mb-0">₹ {item?.product?.product?.price * item?.product?.item} <span className="h6 text-muted"><strike>₹ {item?.product?.product?.OriginalPrice * item?.product?.item}</strike></span></h5>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                                : <div className="col-lg-6 m-auto">
                                    <div className="d-flex justify-content-center align-items-center flex-column">
                                        <Image src={'/images/emptyCart.png'} height="400" width="400"></Image>
                                        <h3>Cart is Empty !..</h3>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </section>
            {
                cartItems[0] &&
                <section>
                    <div className="container mb-4">
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <small className="mb-2">Congratulations you got ₹ {discount} Discount <a data-bs-toggle="modal" data-bs-target="#discountTerms" href='#discountTerms'>See How It Works ?</a></small>
                            <h3>Total: <b>₹ {(total + parseInt(user?.country?.charge)) - discount}</b><strike className="text-muted ms-3 h5">₹ {total + parseInt(user?.country?.charge)}</strike></h3>
                            <small className="mb-2">Shipping Charge Included*</small>
                            <button className="btn btn-primary btn-lg border-0 bg-primary" onClick={handlePayment}>Order Now</button>
                        </div>
                    </div>
                </section>

            }
            <div className="modal fade" id="discountTerms" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Discount Terms</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group">
                                <li className="list-group-item">In the purchase of ₹ 5000 - ₹ 10000 then you will get discount of ₹ 500</li>
                                <li className="list-group-item">In the purchase of ₹ 10000 - ₹ 15000 then you will get discount of ₹ 1000</li>
                                <li className="list-group-item">In the purchase of ₹ 15000 - ₹ 20000 then you will get discount of ₹ 1500</li>
                                <li className="list-group-item">In the purchase of ₹ 20000 and above then you will get discount of ₹ 2000</li>
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </>
    )
}

export default Cart