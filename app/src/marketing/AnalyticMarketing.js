import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import db from '../db.js'
import auth from "../auth";


export default () => {
    const [selectedOption, setSelectedOption] = useState("")
    const [popularProduct, setPopularProduct] = useState("")
    const [data, setData] = useState("")
    const [analytics, setAnalytics] = useState("")


    useEffect(() => {
        getAnalytics()
    }, [])

    const getAnalytics = async () => {
        let analytics = await db.analytics.getByQueryRaw('marketing', '')
        let text = await analytics.text()
        setData("analytics")
        setAnalytics(text)
        console.log(text)
        let productId = Number.parseInt(text.split(' ')[1])
        let product
        if (!productId) {
            setPopularProduct("None")
        } else {
            product = await db.products.getByQueryNoFormat('marketing',productId)
            console.log(product, "This is the product")
            if (product.custom == null)
                setPopularProduct(product.normal)
            else
                setPopularProduct(product.custom)
        }
    }

        return (
            <div>
                <p>Most visited
                    page: {analytics.split(' ')[0].substring(0, 1).toUpperCase() + analytics.substring(1).split(' ')[0] + " page"}</p>
                <p>Most visited product: {popularProduct.name ? popularProduct.name : popularProduct}</p>
            </div>
        );
}