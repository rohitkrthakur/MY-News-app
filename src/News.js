import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: PropTypes.string,



  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
 


  constructor() {
    super();
    console.log("hello i am a constructor from news components");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }
  async componentDidMount() {
    
    let url = 
      `http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8516988872fb4d7a89199f0fa3a6f9fa&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
  }
  handlePrevClick = async ()=>{
    console.log("previous button clicked")
    let url =`http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8516988872fb4d7a89199f0fa3a6f9fa&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json();
  console.log(parsedData);
  this.setState({
   page: this.state.page - 1,
    articles: parsedData.articles
  })
    
    
  }
  handleNextClick = async ()=>{
    console.log("Next button clicked")
  if( this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

  } else{
   let url =`http://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8516988872fb4d7a89199f0fa3a6f9fa&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
    page: this.state.page + 1,
    articles: parsedData.articles
    })
  }
  
       
  }
  render() {
    const { articles } = this.state;

    if (!articles || articles.length === 0) {
      return <div></div>;
    }
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'35px 0px'}}>DailyNews - Top headlines</h1>
        <div className="row">
          {this.state.articles.map((element)=> {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : " "}
                  descreption={
                    element.description ? element.description.slice(0, 100) : " "
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page===1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
