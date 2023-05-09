import React, { Component } from 'react';
import {axios} from "../../utilities/axios";
import Sidebar from './Sidebar'
import DashNav from './DashNav'
import NewArticle from '../article/NewArticle'
import AllArticles from '../article/AllArticles'
import { useEffect, useState} from 'react';

const Admin = () => {

  useEffect(() => {

      axios.get('http://localhost:5000/user/dash')
        .then((res) => {
            console.log('access granted')
          })
        .catch(error => console.log(error))
    },[])

    return (
      <div class='container'>
        <Sidebar/>
        <div id='admindash'>
            <TabContainer tabs={[
              {icon:'library_add',view:<NewArticle/>},
              {icon:'apps',view:<AllArticles/>}
            ]}/>
            <AllArticles/>
        </div>
      </div>

    )


}
export default Admin;

const TabContainer = ({tabs})=>{
  const [activeTab,setActiveTab]=useState(tabs[0].icon)

  return (
    <div class='col' style={{padding:'0'}}>
      <div id='dashnav'>
        {tabs.map(item =>{
          return <span class="material-icons" onClick={()=>setActiveTab(item.icon)}>{item.icon}</span>
        })}
      </div>
      <div class='container'>
          {activeTab?tabs.map(item =>{
            if(activeTab==item.icon){
              return item.view
            }
          }):''}
      </div>
    </div>
  )
}
