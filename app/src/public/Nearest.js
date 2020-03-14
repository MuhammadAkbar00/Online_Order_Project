import React, {useEffect, useState} from 'react'
import 'ol/ol.css'
import {Map, View, Feature} from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM, {ATTRIBUTION} from 'ol/source/OSM'
import {Container, Col, Row} from "react-bootstrap"
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Point from 'ol/geom/Point'
import {Circle as CircleStyle, Fill, Icon, Stroke, Style, RegularShape} from 'ol/style';
import Auth from "../auth.js"
import { toSize } from 'ol/size'
import Overlay from 'ol/Overlay';
import TileState from 'ol/TileState';

export default () => {

    //State to save permission to locate the user
    const [permission, setPermission] = useState(false)

    //Do this one time and delete after objects references
    useEffect(()=>{


        const showPopUp = (element, data)=>{
            element.innerHTML = `
            
                <div style="background-color: black; padding: 10px; border-radius: 10px">
                    <p>${data}</p>
                </div>
            
            `
        }

        const hidePopUp = (element) => {
            element.innerHTML=``
        }



        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                ()=>{setPermission(true)}
            )
            if (permission) {

                let popupElement = document.getElementById('popup');

                let point1 = new Feature({
                    type: 'icon',
                    geometry: new Point([5735186.62973667, 2910517.015046888]),
                })

                let point2 = new Feature({
                    type: 'icon',
                    geometry: new Point([5735186.62973667, 2910610.01]),
                })

                let popup = new Overlay({
                    element: popupElement,
                    positioning: 'bottom-center',
                    stopEvent: false,
                    offset: [0, -50]
                });
                  


                let vectorLayer = new VectorLayer({
                    source: new VectorSource({
                        features: [point1, point2]
                    }),
                    style: new Style({
                        image: new Icon({
                            anchor: [0.5,428],
                            anchorYUnits: 'pixels',
                            src: 'images/icon.png',
                            scale: 0.1,
                            size: toSize(428)
                        })
                    })

                })


                let map = new Map({
                    target: 'map',
                    layers: [
                        new TileLayer({
                            source: new OSM({
                                tileLoadFunction: async (tile, src) => {
                                    let get = await fetch(src,{
                                        method: 'GET',
                                        headers: {
                                            "x-rapidapi-host": "maptiles.p.rapidapi.com",
                                            "x-rapidapi-key": "e71b8ab174msh1c150bbedd0d83ap1e4990jsn81ff4ea8a289",
                                        }
                                    })

                                    let data = await get.blob()

                                    data = await URL.createObjectURL(data)
                                    
                                    if (data !== undefined) {
                                        tile.getImage().src = data;
                                    } else {
                                        tile.setState(TileState.ERROR);
                                    }
                                    
                                    setTimeout(() => {
                                        URL.revokeObjectURL(data)
                                    }, 1000);

                                },
                                url: 'https://maptiles.p.rapidapi.com/en/map/v1/{z}/{x}/{y}.png'
                            })
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

                map.addOverlay(popup);

                let clickHandler = (e) => {
                    let feature = map.forEachFeatureAtPixel(e.pixel,
                        function(feature) {
                          return feature
                        });
                      let element = popup.getElement()
                      if (feature) {
                        let coordinates = feature.getGeometry().getCoordinates()
                        
                        popup.setPosition(coordinates)
                        showPopUp(element, "Al Rayyan branch")
                      }else{
                          hidePopUp(element)
                      }

                }

                map.on('click', clickHandler)

            }
        }
    })


    return (
        <Container fluid>
            <Row>
                <Col md={6} xs={6}></Col>
                <Col md={6}>
                    <div id={"map"} className={"map"}><div id="popup"></div></div>
                </Col>
            </Row>
        </Container>
    )
}