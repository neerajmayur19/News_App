import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

export class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  
  render() {
    return (
      <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<News exact apiKey = {this.apiKey} key = "general" title = "General" pageSize = {6} country = "in" category = "general"/>}/>
          <Route path = "/business" element = {<News  exact apiKey = {this.apiKey} key = "business" title = "Business" pageSize = {6} country = "in" category = "business"/>}/>
          <Route path = "/entertainment" element = {<News exact apiKey = {this.apiKey} key = "entertainment" title = "Entertainment" pageSize = {6} country = "in" category = "entertainment"/>}/>
          <Route path = "/health" element = {<News exact apiKey = {this.apiKey} key = "health" pageSize = {6} title = "Health" country = "in" category = "health"/>}/>
          <Route path = "/science" element = {<News exact apiKey = {this.apiKey} key = "science" pageSize = {6} title = "Science" country = "in" category = "science"/>}/>
          <Route path = "/sports" element = {<News exact apiKey = {this.apiKey} key = "sports" pageSize = {6} title = "Sports" country = "in" category = "sports"/>}/>
          <Route path = "/technology" element = {<News exact apiKey = {this.apiKey} key = "technology" title = "Technology" pageSize = {6} country = "in" category = "technology"/>}/>
        </Routes>
      </Router>
      </div>
    )
  }
}

export default App

