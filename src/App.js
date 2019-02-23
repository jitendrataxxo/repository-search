import React, { Component } from 'react';
import $ from 'jquery'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {repositories: [], matches: []};
  }

  componentDidMount() {
    $.ajax({
      url: "https://api.github.com/search/repositories?q=TEST",
      success: (responce) => {
        this.setState({repositories: responce.items})
      }
    })
  }

  onChange = (e) => {
    let matches = this.state.repositories.filter(match => {
      return match.name.includes(e.target.value) ? match : null
    })
    this.setState({matches: matches})
  }
  render(){
    // console.log(JSON.parse(JSON.stringify(this.state.repositories))[0])
    return(
    <div className="uk-card">
      <div className="uk-card-header">
        <div className="uk-card-title" style={{background: 'blue', color: 'white'}}>Repository Search</div>
        <input
          className="uk-input"
          onChange={this.onChange}
        />
      </div>
      <div className={`uk-card-body uk-grid`}>
        {this.state.matches.map(
          obj => {
            return <div key={obj.id} className={`uk-width-1-4 uk-card-small`} style={{border: '1px solid black'}}>
              <div className="uk-card-body">
                {/* <img url={obj.img} alt={obj.name}/> */}
                <h2>{obj.name}</h2>
                <div className="uk-grid">
                  <div className="uk-width-1-3"><b>forks :</b> <span>{obj.forks}</span>
                  </div>
                  <div className="uk-width-1-3"><b>open issues : </b>{obj.open_issues}</div>
                </div>
                <div className="uk-card-footer">{obj.description}</div>
                <a href={obj.archive_url}><h4>View Propfile</h4></a>
              </div>
            </div>
          }
        )}
      </div>

    </div>
    )
  }
}

export default App;
