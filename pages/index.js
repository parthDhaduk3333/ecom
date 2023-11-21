import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Populerproducts, products } from '../api';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Product from '../components/Product';
import Title from '../components/Title';

export default function Home() {
    const [populerItems, setPopulerItems] = useState([]);
    const [toysCollection, setToysCollection] = useState([])
    useEffect(() => {
        const CallNow = async () => {
            let { data } = await Populerproducts();
            setPopulerItems(data.products)
        }
        CallNow();
    }, [])
    useEffect(() => {
        const CallNow = async () => {
            let { data } = await Populerproducts(true);
            setToysCollection(data.products)
        }
        CallNow();
    }, [])
    return (
        <>
            <Head>
                <title>A & N Closet | Home</title>
                <meta name="description" content="Glozmy online Store" />
            </Head>

            <Navbar></Navbar>
            <section>
                <div className="main-banner item">
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-lg-6">
                            </div>
                            <div className="col-lg-6">
                                <div className="d-flex flex-column align-items-center text-white">
                                    <h2 className="display-3 heading mb-0">New Collection</h2>
                                    <h3 className="my-3 text-center">Get Latest Fashion And More</h3>
                                    <p className="text-center lh-lg w-75">What you wear is how you present yourself to the world, especially today when human contacts are so quick. Fashion is instant language.</p>
                                    <Link href="/64198dd662bc9861cd924cf8">
                                        <button className="btn btn-dark btn-lg rounded-pill px-3">Discover Now</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="row m-0 align-items-center">
                    <div className="col-md-6 p-0">
                        <div className="watchCollection position-relative">
                            <Image src="/images/watchcollection.png" layout='fill' alt="watchCollection"></Image>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex flex-column align-items-center">
                            <p className="text-primary mb-0 fw-bold">NEW 2023 COLLECTION SHOP NOW</p>
                            <h3 className="mt-2 mb-3 fw-bold">Latest Kids Collection</h3>
                            <p className="w-50 text-center lh-lg">
                            Shopping for babies garments is not an easy task, but if your business provides a helping to the parents, 
                            then it could be.
                             These days people need the best quality for their babies at an affordable price.</p>
                        </div>
                    </div>
                </div>
                <div className="row m-0 align-items-center flex-row-reverse flex-lg-row">
                    <div className="col-md-6">
                        <div className="d-flex flex-column align-items-center">
                            <p className="text-primary mb-0 fw-bold">NEW 2023 COLLECTION SHOP NOW</p>
                            <h3 className="mt-2 mb-3 fw-bold">Men’s & Women Fashion</h3>
                            <p className="w-50 text-center lh-lg">
                            Fashion is what you adopt when you don’t know who you are.
                            Fashion is a playground up until a certain age. 
                            But then you have to find your own signature and your own style.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 p-0">
                        <div className="fashionCollection position-relative">
                            <Image src="/images/fashionCollection.png" layout='fill' alt="fashionCollection"></Image>
                        </div>
                    </div>
                </div>
            </section>
            <section className="m-100">
                <Title title="Populer Product"></Title>
                <div className="container">
                    <div className="row">
                        {
                            populerItems?.map(item => {
                                return <>
                                    <Product item={item} key={item._id}></Product>
                                </>
                            })
                        }
                    </div>
                </div>
            </section>
            <section className="m-100 testimonial text-white">
                <div className="container">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div className="testimonialImage">
                            <Image height="124" width="124" src="/images/testimonial.png" alt="testimonial" className="img-fluid" />
                        </div>
                        <div className="my-3">
                            <h3 className="text-center">A & N Closet</h3>
                            {/* <h5 className="text-primary">CEO, Structure infotech</h5> */}
                        </div>
                        <p className="text-center w-75 lh-lg mb-0">
                        WE ARE WORKING AT ALL THE STAGES OF OUR VALUE CHAIN, FROM HOW WE DESIGN OUR PRODUCTS, CHOOSE OUR MATERIALS AND MAKE OUR GARMENTS, ALL THE WAY TO LOGISTICS, WAREHOUSES AND STORES. WE ARE MOVING TOWARD A CIRCULAR ECONOMY MODEL TO ENABLE A LONGER LIFE CYCLE OF OUR PRODUCTS, STARTING WITH THE WAY WE WORK IN THE DESIGN AND PRODUCTION PROCESS, AND THROUGH OUR REPAIR, RESELL AND DONATION PROGRAMMES. OUR COMMITMENTS CAN´T BE ACHIEVED ALONE.</p>
                    </div>
                </div>
            </section>
            <section className="m-100">
                <Title title={'New Kids Collection'}></Title>
                <div className="container">
                    <div className="row">
                        {
                            toysCollection?.map(item => {
                                return <>
                                    <Product item={item} key={item._id}></Product>
                                </>
                            })
                        }
                    </div>
                </div>
            </section>
            <section className="m-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 my-3 ps-2">
                            <div className="d-flex align-items-start">
                                <h2 className="display-2 m-0 me-3 fw-bold extra-title">S</h2>
                                <div className="ms-3">
                                    <h4>Shipping Method</h4>
                                    <div className="extra-line"></div>
                                    <p className="m-0 lh-lg">Shipping options may vary depending on the delivery address, what time you place your order and item availability.
When you process your order, we will show you the shipping methods available, the cost and the estimated delivery date.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 my-3 ps-2">
                            <div className="d-flex align-items-start">
                                <h2 className="display-2 m-0 me-3 fw-bold extra-title">C</h2>
                                <div className="ms-3">
                                    <h4>Customer Care</h4>
                                    <div className="extra-line"></div>
                                    <p className="m-0 lh-lg">Customer Care no. :+91 123 456 789 Email us at customercare@aandn.com (Operational Timings: 08:00AM to 10:00PM)</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 my-3 ps-2">
                            <div className="d-flex align-items-start">
                                <h2 className="display-2 m-0 me-3 fw-bold extra-title">P</h2>
                                <div className="ms-3">
                                    <h4>Payment Security</h4>
                                    <div className="extra-line"></div>
                                    <p className="m-0 lh-lg">The security of the information that customers delegate to A&N Closet.com is one of our top priorities, which is why we invest a great deal of resources and use the latest technology available to ensure that your payment details are processed in a secure setting.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}
