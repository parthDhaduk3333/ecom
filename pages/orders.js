import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Orders } from '../api'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Title from '../components/Title'
const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const { user,fetched } = useSelector(state => state.user);
  const router = useRouter();
  useEffect(() => {
    const callNow = async () => {
      try {
        const { data } = await Orders()
        if (data.success) {
          setOrders(data.orders)
        }
        console.log(data)
      } catch (err) {
        return;
      }
    }
    callNow();
  }, [])
  useEffect(() => {
    if (fetched) {
      if (!user.name) {
        router.push('/login');
      }
    }
  }, [user]);
  return (
    <>
    <Head>
      <title>A & N Closet | Orders</title>
    </Head>
      <Navbar></Navbar>
      <section className='m-100'>
        <Title title="Orders"></Title>
        <div className="container">
          <div className="row">
            {
              orders[0] ? orders.map(item => {
                return item.product[0] && item.product.reverse().map(item2 => {
                  return <div className="col-lg-4 col-md-6 my-3" key={item2._id}>
                    <div className="d-flex align-items-center">
                      <div className="cartImage ">
                        <div className="w-100 h-100 position-relative">
                          <Image layout='fill' src={item2.product.thumb} alt="thumb" className="img-fluid w-100" />
                        </div>
                      </div>
                      <div className="ms-2">
                        <p className="m-0">{item2.product.name}</p>
                        <p className="m-0 text-muted">Size : {item2.size}</p>
                        <div className="my-2 product-counter px-2" style={{ whiteSpace: 'nowrap' }}>
                          Quantity : {item2.item}
                        </div>
                        <h5 className="fw-bold mb-0">₹ {item2.product.price * item2.item} <span className="h6 text-muted"><strike>₹ {item2.product.OriginalPrice * item2.item}</strike></span></h5>
                        <small>₹ {item2.product.price} per each</small>
                      </div>
                    </div>
                    <h5 className="text-center text-md-start">Status : <span className="fw-bold">{item.status}</span></h5>
                    <div className="progress" style={{ height: "10px" }}>
                      <div className={`progress-bar ${item.status == "Delivered" && 'bg-success'} ${item.status == "Dispatched" && 'bg-info'} ${item.status == "Accepted" && 'bg-warning'} `} role="progressbar" style={{ width: `${item.status == 'Order Created' ? "25%" : item.status == 'Accepted' ? "50%" : item.status == 'Dispatched' ? "75%" : item.status == "Delivered" && '100%'}` }}></div>
                    </div>
                  </div>
                })
              })
              : <div className="col-lg-6 m-auto">
              <div className="d-flex justify-content-center align-items-center flex-column">
                  <Image src={'/images/order.png'} height="400" width="400"></Image>
                  <h3>You have not any Orders...</h3>
              </div>
          </div>
            }
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  )
}

export default OrdersPage