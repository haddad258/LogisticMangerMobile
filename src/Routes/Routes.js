import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import LoginScreen from '../login/login'
import Camera from '../Camera/Camera'
import Home from '../Menu/Home'
import Pallets from '../Composition/Pallets'
import Boxes from '../Composition/Box'
import Dashboard from '../Dashbord/Dashboard'
import Containers from '../Composition/Containers'
import Products from '../Products/Products'
import Beecons from '../IoT/Beecons'
import Gateways from '../IoT/Gateways'

export default  Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene type="replace" key = "Login" component = {LoginScreen} title = "Qrcode lecteur" initial = {true} hideNavBar />
         <Scene  key = "Home" component = {Home} hideNavBar />
         <Scene  key = "Containers" component = {Containers} hideNavBar />
         <Scene  key = "Pallets" component = {Pallets} hideNavBar />
         <Scene  key = "Boxes" component = {Boxes} hideNavBar />
         <Scene  key = "Camera" component = {Camera} hideNavBar />
         <Scene  key = "Dashboard" component = {Dashboard} hideNavBar />
         <Scene  key = "Beecons" component = {Beecons} hideNavBar />
         <Scene  key = "Gateways" component = {Gateways} hideNavBar />

         <Scene  key = "Products" component = {Products} hideNavBar />







        




         
      </Scene>
   </Router>
)
