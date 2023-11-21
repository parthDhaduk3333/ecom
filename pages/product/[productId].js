import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import { addToCart, product } from '../../api'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setCart } from '../../store/userSlice'
import Head from 'next/head'

const ProductId = () => {
    const router = useRouter();
    const { productId } = router.query;
    const [singleProduct, setSingleProduct] = useState({})
    const [description, setDescription] = useState([])
    const [size, setSize] = useState("")
    const dispatch = useDispatch()
    useEffect(() => {
        const callNow = async () => {
            if (productId) {
                try {
                    const { data } = await product(productId)
                    if (!data.success) {
                        return;
                    }
                    setSingleProduct(data.product)
                    setDescription(data.product.description.split('.'))
                    setSize(data.product.size[0])
                } catch (err) {
                    return;
                }
            }
        }
        callNow();
    }, [productId])

    const cart = async () => {
        try {
            const { data } = await addToCart({ product: singleProduct?._id, size })
            if (!data.success) {
                router.push('/login')
                return;
            }
            toast.success(data.msg)
            dispatch(setCart(data.cart.length))
        } catch (err) {
        }
    }
    return (
        <>
        <Head>
            <title>A & N Closet | {singleProduct.name}</title>
        </Head>
            <Navbar ></Navbar>
            <section>
                <div className="container">
                    <div className="row align-items-start my-4">
                        <div className="col-lg-6">
                            <div className="d-flex">
                                <div className="w-100">
                                    {
                                        singleProduct?.images?.map(item => {
                                            return (
                                                <div className="w-100 position-relative singleProduct" key={item}>
                                                    <Image layout='fill' src={item} alt={item} className="img-fluid my-2" />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 sticky-top pt-4">
                            <h5 className="m-0 text-primary fw-bold">{singleProduct?.subCategory?.name}</h5>
                            <h4 className="lh-base w-75">
                            {singleProduct?.name}
                            </h4>
                            <small className="text-muted">All taxes and international duties included</small>
                            <h2 className="h1 my-2 fw-bold">₹ {singleProduct?.price} <span className="h4 text-muted"><strike>₹ {singleProduct?.OriginalPrice}</strike></span></h2>
                            <h5 className="text-muted">Size</h5>
                            <select className="form-select w-25 mb-3" onChange={e => setSize(e.target.value)}>
                                {
                                    singleProduct?.size?.map(item => {
                                        return <option value={item} key={item}>{item}</option>
                                    })
                                }
                            </select>
                            <button className="btn btn-primary bg-primary border-0 fw-bold px-4 py-2 my-2" onClick={cart}>Add To Cart</button>
                            <ul className="description-list">
                                {
                                    description?.map(item => {
                                        if(item) {
                                        return <li className="m-0 lh-lg">
                                            {item}.
                                        </li>
                                        }
                                        return;
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export default ProductId