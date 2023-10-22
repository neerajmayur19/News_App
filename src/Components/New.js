import React, { Component } from 'react'
import NewsItem from './NewsItem'
import '../App.css'
import Loading from './Loading';
import PropTypes from 'prop-types';

export class News extends Component {
    articles = [];
    constructor(props)
    {
        super(props)
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title = `${this.props.title} - NewsMonkey`;
    }
    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=26780c54fb0b4e5d8184f6c3ab2bcc2e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults});
    }

    handleNextPage = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=26780c54fb0b4e5d8184f6c3ab2bcc2e&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        });
    }

    handlePreviousPage = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=26780c54fb0b4e5d8184f6c3ab2bcc2e&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        });
    }

    render() {
    return (
    <div>
        <div className="container my-3">
        <h1 className = "main-heading">{this.props.title} - Top Headlines</h1>
        {this.state.loading && <Loading />}
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4">
            <NewsItem title = {element.title?element.title.slice(0,59):""} description = {element.description?element.description.slice(0,90):""} Image = {element.urlToImage} URL = {element.url} author = {element.author===null?'Unknown':element.author} time = {element.publishedAt} source = {element.source.name}/>
            </div>
        })}
        </div>
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled = {this.state.page<=1} type="button" class="btn btn-dark" onClick = {this.handlePreviousPage}>&#8592; Previous</button>
        <button type="button" disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.state.pageSize)} class="btn btn-dark" onClick = {this.handleNextPage}>Next &#8594;</button>
        </div>
    </div>
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
