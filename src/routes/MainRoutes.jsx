import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AddData from '../pages/AddData'

function MainRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' Component={Home}></Route>
        {/* <Route path='/addData' Component={AddData}></Route> */}
        <Route path='/addData/:id?' Component={AddData}></Route>
      </Routes>
    </div>
  )
}

export default MainRoutes
