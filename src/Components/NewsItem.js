import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    return (
      <div className = "my-3">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style = {{zIndex: 1,left: '90%'}}>{this.props.source}</span>
        <img src={this.props.Image===null?"https://i.gadgets360cdn.com/large/apple_logo_1556684737623.JPG":this.props.Image} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{this.props.title}...</h5>
            <p className="card-text">{this.props.description}..</p>
            <p className="card-text"><small className="text-muted">By {this.props.author} on {new Date(this.props.time).toGMTString()}</small></p>
            <a href={this.props.URL} target = "_blank" rel="noreferrer" className="btn btn-dark">Open Link</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
