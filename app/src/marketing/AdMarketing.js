import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import db from '../db.js'
import {useHistory} from "react-router-dom";
import auth from "../auth";


export default () => {

    const [adCreate, setAdCreate] = useState(false)
    const [adEdit, setAdEdit] = useState(false)

    const history = useHistory();

    //Showing Ad
    const [ad, setAd] = useState([])
    const [advertisers, setAdvertisers] = useState([])
    //Show Ad Edit
    const [adToEdit, setAdToEdit] = useState({})
    //Creating Ad
    const [advertiserId, setAdvertiserId] = useState("")
    const [desc , setDesc ] = useState("")
    const [image , setImage ] = useState("")
    const [slot , setSlot ] = useState("")
    const [display , setDisplay ] = useState("")
    //Editing
    const [editId, setEditId] = useState("")
    const [editAdvertiserId, setEditAdvertiserId] = useState("")
    const [editDesc , setEditDesc ] = useState("")
    const [editImage , setEditImage ] = useState("")
    const [editSlot , setEditSlot ] = useState("")
    const [editDisplay , setEditDisplay ] = useState("")

    useEffect(() => {
        if(auth.isLoggedIn()){
            handleGetByQuery()
            handleGetAllAdverts()
        }
    }, [])

    const handleGetByQuery = async () => {
        const ads = await db.adverts.getPublic("")
        console.log(ads)
        setAd(ads)
    }

    const handleGetAllAdverts = async () => {
        const allAdvertisers = await db.advertisers.getPublic("")
        console.log(allAdvertisers)
        setAdvertisers(allAdvertisers)
    }

    const handleAdvertiserId = (event) => {
        setAdvertiserId(event.target.value)
    }

    const handleDescription = (event) => {
        setDesc(event.target.value)
    }

    const handleImage = (event) => {
        setImage(event.target.value)
    }

    const handleSlot = (event) => {
        setSlot(event.target.value)
    }

    const handleDisplay = (event) => {
        setDisplay(event.target.value)
    }

    //
    const handleAdCreate = () => {
        setAdCreate(true)
    }

    const handleAdEdit = async (id) => {
        setAdEdit(true)
        console.log(id, "this is the id we getting")
        const edited = await db.adverts.getPublic(`${id}`)
        console.log(edited)
        setEditId(edited.id)
        setEditAdvertiserId(edited.advertiserId)
        setEditDesc(edited.desc)
        setEditImage(edited.image)
        setEditSlot(edited.slot)
        setEditDisplay(edited.display)
    }

    const handleAdDelete = async (id) => {
        await db.adverts.deleteById('public',id)
        handleGetByQuery()
    }

    const handleEditAdvertiserId = (event) => {
        setEditAdvertiserId(event.target.value)
    }

    const handleEditDesc = (event) => {
        setEditDesc(event.target.value)
    }

    const handleEditImage = (event) => {
        setEditImage(event.target.value)
    }

    const handleEditSlot = (event) => {
        setEditSlot(event.target.value)
    }

    const handleEditDisplay = (event) => {
        setEditDisplay(event.target.value)
    }

    const handleGetCompanyName = (id) => {
        let adName = ""
        advertisers.map(item =>
            {
                if(item.id == id){
                    adName = item.companyName
                }
            }
        )
        return adName;
    }

    const handleAdEditSave = async () => {
        let addit = {
            id: editId,
            advertiserId: editAdvertiserId,
            desc: editDesc,
            image: editImage,
            slot: editSlot,
            display: editDisplay
        }
        await db.adverts.savePublic("public",addit)
        handleGetByQuery()
        setAdEdit(false)
    }


    const handleCreate = async () => {
        let adCreate = {
            advertiserId: advertiserId,
            desc: desc,
            image: image,
            slot: slot,
            display: display
        }
        await db.adverts.savePublic("public",adCreate)
    }

    return (
        auth.isMarketing() ?
        adCreate ?
        <div className="App">
            <header style={{marginLeft:200}} className="App-header">
                <h1>Create Ad</h1>
                <dl>
                    <dt>Advertiser</dt>
                    <dd>
                        <Form.Control type="text" style={{width:'500px'}} placeholder={`AdvertiserId`} onChange={handleAdvertiserId} value={advertiserId} />
                    </dd>
                    <dd>
                        <Form.Control type="text" style={{width:'500px'}} placeholder={`Description`} onChange={handleDescription} value={desc} />
                    </dd>
                    <dd>
                        <Form.Control type="text" style={{width:'500px'}} placeholder={`Image`} onChange={handleImage} value={image} />
                    </dd>
                    <dd>
                        <Form.Control type="text" style={{width:'500px'}} placeholder={`Slot`} onChange={handleSlot} value={slot} />
                    </dd>
                    <dt>Display</dt>
                    <div className={"form-check form-check-inline"}>
                        <input type="radio" onClick={handleDisplay} value={"Y"} className="form-check-input" id="materialInline1" name="inlineMaterialRadiosExample"></input>
                        <label className="form-check-label" htmlFor="materialInline1">Yes</label>
                    </div>
                    <div className={"form-check form-check-inline"}>
                        <input type="radio" onClick={handleDisplay} value={"N"} className="form-check-input" id="materialInline1" name="inlineMaterialRadiosExample"></input>
                        <label className="form-check-label" htmlFor="materialInline1">No</label>
                    </div>

                </dl>
                <Button onClick={handleCreate} >Create</Button>
            </header>
        </div>
            :
            adEdit ?
                <div>
                    <h1>Ad</h1>
                    <dl>
                        <dt>Advertiser</dt>
                        <dd>
                            <Form.Control type="text" style={{width:'500px'}} placeholder={`${editAdvertiserId}`} onChange={handleEditAdvertiserId} value={editAdvertiserId} />
                        </dd>
                        <dt>Description</dt>
                        <dd>
                            <Form.Control as="textarea" rows="3" style={{width:"50vw"}} placeholder={`${editDesc}`} onChange={handleEditDesc} value={editDesc}/>
                        </dd>
                        <dt>Image</dt>
                        <dd>
                            <Form.Control type="text" style={{width:'500px'}} placeholder={`${editImage}`} onChange={handleEditImage} value={editImage} />
                        </dd>
                        <dt>Edit</dt>
                        <dd>
                            <Form.Control type="text" style={{width:'500px'}} placeholder={`${editSlot}`} onChange={handleEditSlot} value={editSlot} />
                        </dd>
                        <dt>Display</dt>
                        <div className={"form-check form-check-inline"}>
                            <input type="radio" onClick={handleEditDisplay} value={"Y"} className="form-check-input" id="materialInline1" name="inlineMaterialRadiosExample"></input>
                            <label className="form-check-label" htmlFor="materialInline1">Yes</label>
                        </div>
                        <div className={"form-check form-check-inline"}>
                            <input type="radio" checked={true} onClick={handleEditDisplay} value={"N"} className="form-check-input" id="materialInline1" name="inlineMaterialRadiosExample"></input>
                            <label className="form-check-label" htmlFor="materialInline1">No</label>
                        </div>
                    </dl>
                    <Button onClick={handleAdEditSave} >Save</Button>
                </div>
                :
            <div>
                <p>List Of Ads</p>
                {ad.map((item,i) =>
                    <div key={i}>
                        <p>Ad {i+1} </p>
                        <p>Company Name: {handleGetCompanyName(item.advertiserId)}</p>
                        <p>Description: {item.desc}</p>
                        <Button onClick={() => handleAdEdit(item.id)}>Edit</Button>
                        <Button onClick={() => handleAdDelete(item.id)}>X</Button>
                    </div>

                )}
                <Button onClick={handleAdCreate} >Create New Ad</Button>
            </div>
            :
            <p style={{color:"red"}}>Unauthorized</p>
    );
}