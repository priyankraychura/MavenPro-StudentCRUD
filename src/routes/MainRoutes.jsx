import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import AddData from '../pages/AddData'

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/add-student-data/:id?' Component={AddData}></Route>
      </Routes>
    </div>
  )
}

export default MainRoutes
