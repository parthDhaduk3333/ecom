import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-3">
                        <div className="d-flex justify-content-center align-items-center">
                            <Link href="/">
                                <Image src="/images/logo.png" height="50" width="200" alt="logo" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-lg-4 my-2">
                        <h5 className="text-primary fw-bold">Address</h5>
                        <div className="d-flex">
                            <div>
                                <Image height="16" width="12" src="/images/location.png" alt="location" className="img-fluid" />
                            </div>
                            <div className="ms-2">
                                <h6 className="lh-base">A & N Closet,Opera Bussiness Hub,<br />Mota Varachha, Surat.</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 my-2">
                        <div className="d-flex flex-column align-items-start">
                            <h5 className="text-primary fw-bold">Get In Touch</h5>
                            <div>
                                <div className="d-flex my-1">
                                    <div>
                                        <Image height="19" width="19" src="/images/phone.png" alt="phone" className="img-fluid" />
                                    </div>
                                    <div className="ms-2">
                                        <h6 className="lh-base">+91 123 456 789</h6>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex my-1">
                                    <div>
                                        <Image height="12" width="16" src="/images/mail.png" alt="mail" className="img-fluid" />
                                    </div>
                                    <div className="ms-2">
                                        <h6 className="lh-base">contacta&n@gmail.com</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 my-2">
                        <h5 className="text-primary fw-bold">News Letter</h5>
                        <div className="mt-3">
                            <div className="nav-search">
                                <div className="input-group mb-1">
                                    <input type="text" className="form-control" placeholder="Enter Email" />
                                    <span className="input-group-text bg-primary text-white" id="basic-addon2">
                                        SUBSCRIBE
                                    </span>
                                </div>
                                <small>We&apos;ll never share your email with anyone else.</small>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="text-center">
                    <small>
                    © 2022 - All rights were reserved by A & N Closet™  
                    </small>
                </div>
            </div>
        </footer>
    )
}

export default Footer