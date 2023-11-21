import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { countries, register } from '../api'

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState('')
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState('')
    const [addressLine1, setAddressLine1] = useState("")
    const [addressLine2, setAddressLine2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pin, setPin] = useState("")
    const [country, setCountry] = useState("")
    const [Countries, setCountries] = useState([])
    const submit = async () => {
        try {
            
            const { data } = await register({ email, password, name, mobile, addressLine1, addressLine2, city, state, pin,country });
            if (!data.success) {
                toast.error(data.msg);
                return;
            }
            toast.success(data.msg);
            router.push('/login');
        } catch (err) {
        }
    }

    useEffect(() => {
        const callNow = async () => {
            const { data } = await countries();
            console.log(data.countries);
            setCountries(data.countries);
            setCountry(data.countries[0]._id);
        }
        callNow();
    }, [])

    return (
        <>
            <Head>
                <title>A & N Closet | Register</title>
            </Head>
            <section>
                <div className="row" style={{ height: "100vh" }}>
                    <div className="col-lg-7">
                        <div className="login-background">
                        </div>
                    </div>
                    <div className="col-lg-4 m-auto">
                        <div className="d-flex justify-content-center align-items-center my-3">
                            <Link href="/">
                                <Image src="/images/logo.png" height="50" width="200"></Image>
                            </Link>
                        </div>
                        <h2 className="title text-center my-3 mb-4 mb-md-4 h3 ">Register</h2>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="mb-3 px-3 px-md-0">
                                    <label className="form-label">Email address <span className="text-danger">*</span></label>
                                    <input type="email" className="form-control" placeholder='abc@mail.com' value={email} onChange={e => setEmail(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3 px-3 px-md-0">
                                    <label className="form-label">Password <span className="text-danger">*</span></label>
                                    <input type="password" maxLength={10} className="form-control" value={password} onChange={e => setPassword(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3 px-3 px-md-0">
                                    <label className="form-label">Name <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3 px-3 px-md-0">
                                    <label className="form-label">Mobile <span className="text-danger">*</span></label>
                                    <input type="text" maxLength={10} className="form-control" value={mobile} onChange={e => setMobile(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3 px-3 px-md-0">
                                    <label className="form-label">Address Line-1 <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3 px-3 px-md-0">
                                    <label className="form-label">Address Line-2 <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3 px-3 px-md-0">
                                    <label className="form-label">City <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" value={city} onChange={e => setCity(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3 px-3 px-md-0">
                                    <label className="form-label">State <span className="text-danger">*</span></label>
                                    <input type="text" className="form-control" value={state} onChange={e => setState(e.target.value)} required/>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3 px-3 px-md-0">
                                    <label className="form-label">Country <span className="text-danger">*</span></label>
                                    <select id="" className='form-select'>
                                        {
                                            Countries?.map(item => {
                                                return <option value={item._id} key={item._id} onClick={e => setCountry(e.target.value)}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="mb-3 px-3 px-md-0">
                                    <label className="form-label">Pin <span className="text-danger">*</span></label>
                                    <input type="text" maxLength={6} className="form-control" value={pin} onChange={e => setPin(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="px-3 px-md-0">
                                <button type="submit" className="btn btn-primary border-0 bg-primary w-100" onClick={submit}>Submit</button>
                            </div>
                        </div>
                        <h6 className="text-center my-3">Already have an account ? <Link href="/login">Sign In</Link></h6>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register