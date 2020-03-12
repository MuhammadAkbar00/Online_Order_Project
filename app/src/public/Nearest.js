import React, {useEffect, useState} from 'react'
import 'ol/ol.css'
import {Map, View, Feature} from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import {Container, Col, Row} from "react-bootstrap"
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Point from 'ol/geom/Point'
import {Circle as CircleStyle, Fill, Icon, Stroke, Style} from 'ol/style';
import Auth from "../auth.js"

export default () => {

    //State to save permission to locate the user
    const [permission, setPermission] = useState(false)

    //Do this one time and delete after objects references
    useEffect(()=>{

        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                ()=>{setPermission(true)}
            )
            if (permission) {

                let point1 = new Feature({
                    type: 'icon',
                    geometry: new Point([5735186.62973667, 2910517.015046888]),
                })

                let vectorLayer = new VectorLayer({
                    source: new VectorSource({
                        features: [point1]
                    })
                })


                let map = new Map({
                    target: 'map',
                    layers: [
                        new TileLayer({
                            source: new OSM()
                        }),
                        vectorLayer
                    ],
                    view: new View({
                        center: [5735186.62973667, 2910517.015046888],
                        zoom: 13,
                        minZoom: 13,
                        maxZoom: 16
                    })
                })



                // setInterval(()=>{
                //     console.log(map.getView().getCenter())
                // },1000)

            }
        }
    })


    return (
        <Container fluid>
            <Row>
                <Col md={6} xs={6}></Col>
                <Col md={6}>
                    <div id={"map"} className={"map"}></div>
                </Col>
            </Row>
        </Container>
    )
}