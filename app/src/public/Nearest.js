import React, {useEffect, useState} from 'react'
import 'ol/ol.css'
import {Map, View, Feature} from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import {Container, Col, Row} from "react-bootstrap"
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Point from 'ol/geom/Point'
import {Icon, Style} from 'ol/style'
import { toSize } from 'ol/size'
import Overlay from 'ol/Overlay'
import TileState from 'ol/TileState'
import db from '../db'
import Button from 'react-bootstrap/Button'
import { fromLonLat } from 'ol/proj'
import PageRecord from '../marketing/PageRecord'

export default () => {

    const [message, setMessage] = useState([])
    const [data, setData] = useState([])
    const [focus, setFocus] = useState([])

    const getData = async () => {
        return await db.branches.getByQuery("public","")
    }

    
    useEffect(()=>{
        (async ()=>{
            let data = await getData()
            setData(data)
        })()
    },[])

    useEffect(()=>{

        //clear
        document.getElementById('map').innerHTML = `
            <div id="popup"></div>
        `


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


        if (true){
            if (true) {

                let popupElement = document.getElementById('popup');

                let popup = new Overlay({
                    element: popupElement,
                    positioning: 'bottom-center',
                    stopEvent: false,
                    offset: [0, -50]
                });
                  

                let vectorLayer = new VectorLayer({
                    source: new VectorSource({
                        features: []
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

                const getData = async () => {
                    let all = await db.branches.getByQuery("public","")
                    all.map((e)=>{
                        vectorLayer.getSource().addFeature(new Feature({type: 'icon', geometry: new Point([e.lon,e.lat])}) )
                    })
                }
                
                getData()
        
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
                        })
                      let element = popup.getElement()
                      if (feature) {
                        let coordinates = feature.getGeometry().getCoordinates()
                        console.log('coor', coordinates)
                        popup.setPosition(coordinates)

                        let featureData = data.filter((e)=>{
                            return (e.lon == coordinates[0] && e.lat == coordinates[1] ? e.province : "") 
                        })

                        showPopUp(element, featureData[0].province+" branch")
                      }else{
                          hidePopUp(element)
                      }
                }

                map.on('click', clickHandler)

                if (focus) {
                    if (focus.length != 0) {
                        if (focus.length == 3) {

                            let userLocation = fromLonLat(focus)
                            let distances = []
                        
                            data.map((e,i) =>{
                                let distance = (userLocation[0]+userLocation[1] - e.lon+e.lat < 0 ?
                                    (userLocation[0]+userLocation[1] - e.lon+e.lat)*-1            :
                                     userLocation[0]+userLocation[1] - e.lon+e.lat)
                                distances.push({distance,i})
                            })
    
                            let shortest = distances[0]
                            distances.map((e)=>{
                                if(e.distance < shortest.distance)
                                    shortest = e
                            })
                            // console.log('distances ',distances)
                            // console.log('shortest one ',data[shortest.i])
    
                            map.getView().setCenter([data[shortest.i].lon,data[shortest.i].lat])

                        } else {
                            map.getView().setCenter(focus)
                        }
                    }
                }
            }
        }
    }, [focus,data])

    const findNearest = () => {
        navigator.geolocation.getCurrentPosition((position)=>{
            setFocus([position.coords.longitude, position.coords.latitude,"third"])
        })
        console.log(focus)
    }

    return (
        <Container fluid>
            <PageRecord pagename={"map"} productId={null} />
            <Row>
                <Col xl={{order:2}} md={{span:11,order:2}}>
                    <div id={"map"} className={"map"}><div id="popup"></div></div>
                </Col>
                <Col md={{span:10,order:1}} xl={{order:1}}>
                    <br />
                    <h3>Looking for a dine in experience ?</h3>
                    <br />
                    <Button onClick={findNearest} variant={"primary"} >Find the nearest branch</Button>
                    <br /><br /><br />
                    <Row>
                        <Col>
                            <h3>All our Restaurants</h3> 
                            <ul>
                            {
                                data.map(e => 
                                <>&nbsp;<a style={{listStyle:"none"}} key={e.id}><Button onClick={()=>{setFocus([e.lon, e.lat])}} variant={"light"}>inDine {e.province}</Button></a></>
                                )
                            }
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}