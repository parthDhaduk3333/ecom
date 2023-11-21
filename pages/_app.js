import { Toaster } from 'react-hot-toast';
import '../styles/bootstrap.min.css';
import '../styles/globals.css';
import '../styles/media.css';
import { Provider, useDispatch } from 'react-redux';
import store from '../store/index'
import { useEffect } from 'react';
import { userData } from '../api';
import { setFetched, setUser } from '../store/userSlice';
import Head from 'next/head';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  const goTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  return <>
    <Provider store={store}>
      <div className="whatsapp-icon">
        <Image src={'/images/up.png'} height={50} width={50} onClick={goTop}></Image>
      </div>
      <User></User>
      <Toaster></Toaster>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
        <meta name="description" content="Glozmy is online product selling website" />
      </Head>
      <Script src='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js' strategy='lazyOnload'></Script>
      <Script src="/js/index.js" strategy='lazyOnload'></Script>
      <Component {...pageProps} />
    </Provider>
  </>
}

const User = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const callNow = async () => {
      const { data } = await userData();
      if (data.success) {
        dispatch(setUser(data.user))
      } else {
        dispatch(setUser({}))
      }
      dispatch(setFetched(true))
    }
    callNow();
  }, [])
}

export default MyApp