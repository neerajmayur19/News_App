import React, { Component } from 'react'
import NewsItem from './NewsItem'
import '../App.css'
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    articles = [];
    constructor(props)
    {
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.props.title} - NewsMonkey`;
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults});
    }

    fetchMoreData = async () => {
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    render() {
    return (
    <>
        <h1 className = "main-heading">{this.props.title} - Top Headlines</h1>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader = {<Loading/>}
        >
        <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4">
            <NewsItem title = {element.title?element.title.slice(0,59):""} description = {element.description?element.description.slice(0,90):""} Image = {element.urlToImage} URL = {element.url} author = {element.author===null?'Unknown':element.author} time = {element.publishedAt} source = {element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
    </>
    )
  }
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
    title: PropTypes.string
}

News.defaultProps = {
    country: 'in',
    category: 'sports',
    pageSize: 6
}
export default News
