import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addToCart } from '../api'
import { setCart } from '../store/userSlice'

const Product = ({ item }) => {
    const [isHovered, setIsHovered] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter();
    const cart = async () => {
        try {
            const { data } = await addToCart({ product: item._id, size: item.size[0] })
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
            <Link href={`/product/${item._id}`}>
                <div className="col-lg-4 col-md-6 my-3">
                    <div className="d-flex flex-column align-items-center">
                        <div className="position-relative productItem" onMouseEnter={e => setIsHovered(true)} onMouseLeave={e => setIsHovered(false)}>
                            {isHovered ?
                                <Image layout="fill" src={item.thumb2} alt="populer" className="img-fluid product-image"  priority/>
                                :
                                <Image layout="fill" src={item.thumb} alt="populer" className="img-fluid product-image"  priority/>
                            }
                            {
                                item.new ?
                                    <div className="newProduct">Latest</div>
                                    : ""
                            }
                        </div>
                        <h5 className="mt-3 text-center">{item.name.slice(0, 35)}...</h5>
                        <div className="d-flex justify-content-center align-items-center">
                            <h4 className="fw-bold text-primary">₹ {item.price}</h4>
                            <h5 className="ms-2"><strike>₹ {item.OriginalPrice}</strike></h5>
                        </div>
                        <button className='btn btn-primary bg-primary border-0' onClick={cart}>Add To Cart</button>
                    </div>
                </div>
            </Link>
        </>
    )

}
export default Product