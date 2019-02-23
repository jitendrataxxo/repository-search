import React, { Component } from 'react';
import $ from 'jquery'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      repositories: [],
      matches: [],
      searchText: ''
    };
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
    this.setState({searchText: e.target.value})
  }

  onClick = () => {
    let matches = this.state.repositories.filter(match => {
      return match.name.includes(this.state.searchText) ? match : null   // If user click on search button
    })
    this.setState({matches: matches})
  }

  keyPressHandler = (e) => {
    if (e.key === 'Enter') {
      let matches = this.state.repositories.filter(match => {
        return match.name.includes(this.state.searchText) ? match : null // if user press enter key
      })
      this.setState({matches: matches})
    }
  }

  render(){
    return(
    <div className="uk-card uk-card-default">
      <div className="uk-card-header">
        <div className="uk-card-title" style={{background: '#2F72A4', color: 'azure', padding: '10px'}}>Repository Search</div>
        <div className={`uk-card-body uk-grid`}>
          <input
            className={`uk-input uk-width-1-2`}
            onChange={this.onChange}
            onKeyPress={this.keyPressHandler}
            placeholder="type text for repo search...."
          />
          <button className={`uk-inline uk-button uk-text-bold uk-width-1-6`} onClick={this.onClick} style={{background: '#2F72A4', color: 'azure', margin: "0px 0px 0px 80px"}}>Search</button>
        </div>
      </div>
      <h4 style={{textAlign: 'center'}}>Repo search results</h4>
      <hr/>
      <div className={`uk-card-body uk-grid`} style={{textAlign: "center", margin: "75px"}}>
        {this.state.matches.map(
          obj => {
            return <div key={obj.id} className={`uk-width-1-4 uk-card uk-card-default uk-card-small`} style={{margin: "3px 3px 3px 3px", height: '500px', width: "400px"}}>
              <div className="uk-card">
                <div className='uk-card-header'>
                  <img src={obj.owner.avatar_url} alt={obj.name} style={{ borderRadius: "50%", height: "50%", width: "50%"}}/>
                  <h2>{obj.name}</h2>
                </div>
                <div className="uk-grid">
                  <div className="uk-width-1-3" style={{borderRadius: "30px", border: "1px solid gray", margin: '0px', padding: '0px', width: '115px', height: '30px'}}>
                    <div className="uk-grid" style={{margin: '0px', padding: '0px'}}>
                      <div className="uk-width-auto" style={{margin: '0px', padding: '1px'}} uk-icon="icon: youtube"></div>
                      <div className="uk-width-auto" style={{margin: '0px', padding: '1px'}}>view</div>
                      <div className="uk-width-auto" style={{margin: '0px', padding: '1px'}}>{obj.watchers}</div>
                    </div>
                  </div>
                  <div className="uk-width-1-3" style={{borderRadius: "30px", border: "1px solid gray", margin: '0px', padding: '0px', width: '100px', height: '30px'}}>
                    <div className="uk-grid" style={{margin: '0px', padding: '0px'}}>
                      <div className="uk-width-auto" style={{margin: '0px', padding: '1px'}} uk-icon="icon: git-fork"></div>
                      <div className="uk-width-auto" style={{margin: '0px', padding: '1px'}}>forks</div>
                      <div className="uk-width-auto" style={{margin: '0px', padding: '1px'}}>{obj.forks}</div>
                    </div>
                  </div>
                  <div className="uk-width-1-3" style={{borderRadius: "30px", border: "1px solid gray", margin: '0px', padding: '0px', width: '145px', height: '30px'}}>
                    <div className="uk-grid" style={{margin: '0px', padding: '0px'}}>
                      <div className="uk-width-auto" style={{margin: '0px', padding: '1px'}} uk-icon="icon: bell"></div>
                      <div className="uk-width-auto" style={{margin: '0px', padding: '1px'}}>open issues</div>
                      <div className="uk-width-auto" style={{margin: '0px', padding: '1px'}}>{obj.open_issues}</div>
                    </div>
                  </div>
                </div>
                <div style={{overflow: true}}>{obj.description}</div>
              </div>
              <div className="uk-card-footer">
                <a className={`uk-inline uk-button uk-text-bold`} style={{background: '#2F72A4', color: 'azure'}} href={obj.owner.html_url}>View Propfile</a>
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
