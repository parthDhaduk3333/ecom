import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Title from '../components/Title';
import Image from 'next/image';
import Footer from '../components/Footer';
import { products, subcategories } from '../api';
import toast from 'react-hot-toast';
import Product from '../components/Product';
const Category = () => {
    const router = useRouter();
    const [category, setCategory] = useState("")
    const [subCategories, setSubCategories] = useState([]);
    const [selected, setSelected] = useState(subCategories[0] && subCategories[0].name);
    const [allProducts, setAllProducts] = useState([])
    const { categoryId } = router.query;
    console.log()
    const chooseSubCategory = async (e, item) => {
        try {
            const { data } = await products(item._id);
            console.log(data);
            if (data.products[0]) {
                setAllProducts(data.products)
            } else {
                setAllProducts([])
            }
        } catch (err) {
            return;
        }
        setSelected(item.name);
    }
    useEffect(() => {
        const callNow = async () => {
            if (categoryId) {
                const { data } = await subcategories(categoryId);
                if (!data.success) {
                    router.push('/');
                    return;
                }
                setSubCategories(data.data);
                console.log(data);
                setCategory(data.data[0]?.category.name);
                setSelected(data.data[0]?.name);
                chooseSubCategory(null, data.data[0])
            }
        }
        callNow();
    }, [categoryId])

    return (
        <>
            <Head>
                <title>A & N Closet | {category}</title>
            </Head>
            <Navbar></Navbar>
            <section className="categoryHeading">
                <div className="container">
                    <h2 className="text-center text-white display-6 fw-bold" style={{ textTransform: "capitalize" }}>{category}</h2>
                </div>
            </section>
            <section className='m-100'>
                <Title title="Categories"></Title>
                <div className="d-flex mt-4 homeCategory justify-content-center">
                    {subCategories?.map(item => {
                        return <h5 className={`mx-2 pb-2 ${selected == item.name ? 'active' : ''}`} key={item._id} onClick={e => chooseSubCategory(e, item)}>{item.name}</h5>
                    })}
                </div>
                <div className="container">
                    <div className="row">
                        {
                            allProducts?.map(item => {
                                if(!item.soldout) {
                                    return <Product item={item} key={item._id}></Product>
                                } else return;
                            })
                        }
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    )
}

export default Category