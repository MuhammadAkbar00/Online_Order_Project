import React, { useState, useEffect } from 'react'
import db from '../db.js'
import Auth from "../auth";
import Button from "react-bootstrap/Button";
import {Link, Route, Switch} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Authenticate from "../public/Authenticate";
import Logout from "../user/Logout";
import Profile from "../user/Profile";
import Students from "../admin/Students";
import CourseDetail from "../public/CourseDetail";
import Courses from "../public/Courses";
import Registrations from "../public/Registrations";
import Home from "../public/Home";
import MenuDetail from "./MenuDetail";
import {DropdownButton, DropdownItem , Dropdown} from "react-bootstrap";
import PageRecord from '../marketing/PageRecord'

export default ({}) => {
    //This useState will include all of the menu that from the database as an array.
  const [menu, setMenu] = useState([])
    //I tried copying menu to fakemenu so that fakemenu will always have the full list of menu (or "Normal" products)
    const [fakemenu, setFakeMenu] = useState([])
//This commented code below was how I first tried implementing the menu details.
    // const [menuDetail, setMenuDetail] = useState(null)

    //This useState is used to search and filter the menu list
  const [searchName, setSearchName] = useState("")
    //I tried implementing a dropDown list to search and filter the menu list by the product type and this usestate is for that.
    //type will include all of the distinct "type" of every menu product
  const [type, setType] = useState([])
  const [searchType, setSearchType] = useState("All")

    //This means that handleGetByQuery will run when Menu.js is called.
    //This will get the list of the Menu from the database.
    //It will get all of the list if there are no constraints such as "searchName" or "dropdown Type"
    //the useEffect and therefore the handleGetByQuery will run every time searchName or searchType changes value.
  useEffect(() => {
    handleGetByQuery()
  }, [searchName,searchType])

    //This is my attempt at implementing the filter/search by type by using a dropdownList
    //I tried setting FakeMenu to menu so basically it is like a copy.
    //And instead of looking through menu, i looped through fakeMenu so that menu will stay the same and not be changed.
    //in the (map) I check for each menu item in the array whether or not its type includes itemt( itemt is basically a type that the user has choosen eg. dessert, main etc. from the dropdownlist)
    //if the item includes whatever type the user chose from the dropdownlist then it will add it to typepick array.
    //The menu will be set to the typepick array (Basically all of the menu products that includes the type that was chosen.
    //this function still needs to be revised.
  const handleSearchType = (itemt) => {
      setSearchType(itemt)
  }

  //This handles the search bar, it will set the searchName variable into whatever the user typed in
    //once the searchName changes, the useEffect will run and therefore handleGetByQuery will be called again.
  const handleSearchName = (event) => {
    setSearchName(event.target.value)
  }


//This is what I use to get the list of all of the Distinct type from all of the menu in the database
    //the function takes in list (which is "menu" aka the list of all the products that handleGetByQuery returns)
    //the for loop loops through the length of the list, and checks whether or not the array i made "type" has that type already in the array or not
    //if it does not have that type in the array then it will add it to the array, else it wont add it to the array (Hence Distinct type).
    //and the the useState type will be set into that list of distinct types
  const handleTypeList = (list) => {
      let type = ["All"];
      for(let i = 0; i < list.length; i++){
         if(!type.includes(list[i].type)){
            type.push(list[i].type)
         }
      }
      console.log(type)
    setType(type)
  }

//This handleGetByQuery runs when Menu.js is called and if searchName and searchType is called)
    //This method is an async method because it has to wait for the database to finish fetching before it can move on.
    //await is when the method will stop and wait for the database to finish fething and then it will continue.
    //since we want everyone to be able to see our list of products, thats why it uses getPublic()
    //db.menu is a table created in the db.js file and then it is exported as menu and thats why we are able to use db.menu after importing db.
    //getPublic method will go to the public controller and will run a method that will get all of the menu from the NormalRepository (menu table in the database)
    //and the list will then be stored in "menu"
    //Then menu will be mapped to check whether or not each products includes the searchName (Whatever the user typed on the search bar) This initially is empty so it will show all of the products
    //the toLowerCase() is used so that the search is not case sensitive.
    //the second if in the map is checking whether or not searchType is empty or not, if it is empty ignore it and just push everything (after searchName filter)
    //if it has something in it then u check whether or not a product has a type equals to whatever the value in searchType, if it is then push it, else dont push it
    //This is all of the filtering that occurs.
    //After the loop the menu will be set into the filtered list.
    //handleTypeList is a function that handles the filtering of the type (Needs to be revised).
    //So basically this method will get all of the fields in Normal table from the database and filters it if it is necessary.
  const handleGetByQuery = async () => {
    console.log(searchType, "Hah")
    const menu = await db.menu.getPublic('')
    console.log("Menu",menu)
    let picked = [];
    menu.map((item) => {
        if(item.name.toLowerCase().includes(searchName.toLowerCase())){
            console.log(searchType != "" || searchType != "All")
            if(searchType == "" || searchType == "All") {
                picked.push(item)
            }
            else {
                if(item.type == searchType){
                    picked.push(item)
                }
            }
        }
    })
    setMenu(picked)
      handleTypeList(menu)
  }

  //Everything here is what will be shown to the user on the page.
    //PageRecord is not made by me, it is made by one of my team member Omar.
    //the first Form Control is the search box, where it will run handleSearchName and passing the value searchName everytime a user types a character into the searchbox
    //The DropDownButton maps throught the type (whichh is the list of all of the distinct product) and the adds it to the dropdownlist
    //each dropDowndown item has an onclick that runs handleSearchType and passes in the item (type name)
    //it will then loop through all of the item in the map and show it to the user. if the user is logged in or authenticated then a "BUY" button will show up, the buy functionality is done by another member
    //It also has a link to menu/:id which will pass in the id and change the url accordingly and will go to menuDetails.js and will go to the get method in the controller. Which will get the Normal product from the database that has that id.
    //and it will show all the details of that 1 product. This is why i did not use the menu details useState.
  return (
    menu &&
    <div className="App">
      <PageRecord pagename="menu" productId={null} />
      <header className="App-header">
        <h1>Menu</h1>
        <Form.Control type="text" placeholder="Search Menu" onChange={handleSearchName} value={searchName} />
        <DropdownButton id="dropdown-basic-button" title={`${searchType}`}>
          {
            type.map(item => <DropdownItem key={item} onClick={() => handleSearchType(item)}>{item}</DropdownItem>)
          }
        </DropdownButton>

        <ul>
          {
            menu.map(item => <div key={item.id}><p style={{fontWeight: "bold", fontSize: 30}}>{item.name}</p>
                  <p>
                    Description: {item.desc}
                  </p>
                  <p>
                    Price: {item.price}
                  </p>
                  <p>
                    Stock: {item.stock}
                  </p>
                  <p>
                    OccasionId: {item.occasionId}
                  </p>
                  <p>
                    Type: {item.type}
                  </p>
                  {Auth.isUser() &&
                  <Button>Buy</Button>}
                  <Link as={Link} to={`menu/${item.id}`}>Details</Link>
            </div>)
          }
        </ul>
      </header>
      <div>
        {/*<Switch>*/}
        {/*  /!*<Route path="/menu/:id" exact>*!/*/}
        {/*  /!*  <MenuDetail />*!/*/}
        {/*  /!*</Route>*!/*/}

        {/*</Switch>*/}
      </div>
    </div>
  );
}