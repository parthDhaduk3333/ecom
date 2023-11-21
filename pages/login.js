import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { login } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/userSlice'
import Link from 'next/link'
import Image from 'next/image'
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch();

  const submit = async () => {
        const { data } = await login({ email, password });
        console.log(data);
        if (!data.success) {
          toast.error(data.msg);
          dispatch(setUser({}));
          return;
        }
        toast.success("Login SuccessFully");
        dispatch(setUser(data.user));
        router.push('/');
  }
  return (
    <>
      <Head>
        <title>A & N Closet | Login</title>
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
            <h2 className="title text-center my-3 h3">Login</h2>
            <div className="mb-3 px-3 px-md-0">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
              <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
            </div>
            <div className="mb-3 px-3 px-md-0">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="col-lg-12">
              <div className="px-3 px-md-0">
                <button type="submit" className="btn btn-primary border-0 bg-primary w-100" onClick={submit}>Submit</button>
              </div>
            </div>
            <h6 className="text-center my-3">Didn&apos;t have an account ? <Link href="/register">Sign up</Link></h6>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login