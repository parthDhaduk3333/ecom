import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { countries, updateUser, userData } from '../api';
import { useRouter } from 'next/router';
import { setUser } from '../store/userSlice';

const Profile = () => {
    const { user, fetched } = useSelector(state => state.user);
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState('')
    const [addressLine1, setAddressLine1] = useState("")
    const [addressLine2, setAddressLine2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [pin, setPin] = useState("")
    const [country, setCountry] = useState("")
    const [Countries, setCountries] = useState([])
    const router = useRouter();
    const dispatch = useDispatch();

    const updateUserData = async () => {
        try {
            const {data} = await updateUser({email,name,mobile,addressLine1,addressLine2,country,city,state,pin})
            if (!data.success) {
                return;
            }
            toast.success(data.msg);
            dispatch(setUser(data.user));
            router.push('/');
        } catch (err) {
            return;
        }
    }

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
        try {
            setEmail(user.email)
            setName(user.name)
            setMobile(user.mobile)
            setAddressLine1(user.addressLine1)
            setAddressLine2(user.addressLine2)
            setCity(user.city)
            setState(user.state)
            setCountry(user.country._id)
            setPin(user.pin)
        } catch (err) {
            return;
        }
      }
      callNow();
    }, [user])
    
    useEffect(() => {
      const CallNow = async () => {
        const { data } = await countries();
        if (data.success) {
            setCountries(data.countries)
        }
      }
      CallNow();
    }, [])
    
    return (
        <>
            <Head>
                <title>A & N Closet | {user?.name}</title>
            </Head>
            <Navbar></Navbar>
            <div className="container">
            <div className="row my-4">
                <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Email address <span className="text-danger">*</span></label>
                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Name <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Mobile <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" value={mobile} onChange={e => setMobile(e.target.value)} />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Address Line-1 <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">Address Line-2 <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="mb-3">
                        <label className="form-label">City <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" value={city} onChange={e => setCity(e.target.value)} />
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="mb-3">
                        <label className="form-label">State <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" value={state} onChange={e => setState(e.target.value)} />
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="mb-3">
                        <label className="form-label">Country <span className="text-danger">*</span></label>
                        <select className='form-select' onChange={e => setCountry(e.target.value)}>
                            {
                                Countries?.map(items => {
                                    if(items._id == country) {
                                        return <option value={items._id} key={items._id} selected>{items.name}</option>
                                    } else {
                                        return <option value={items._id} key={items._id} >{items.name}</option>
                                    }
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="mb-3">
                        <label className="form-label">Pin <span className="text-danger">*</span></label>
                        <input type="text" className="form-control" value={pin} onChange={e => setPin(e.target.value)} />
                    </div>
                </div>
                <div className="col-lg-12">
                    <button className="btn btn-info w-100 my-2 bg-primary text-white fw-bold" onClick={updateUserData}>Save Changes</button>
                </div>
            </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Profile