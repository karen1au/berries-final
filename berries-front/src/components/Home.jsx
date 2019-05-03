import React, { Component } from 'react'
import UsersContainer from './UsersContainer'
import SearchContainer from './search/SearchContainer'


class Home extends Component {
render(){
  return (
    <div>
      <SearchContainer handleSelection={this.props.handleSelection}/>
      <button type="submit" onClick={this.props.queryResults}>Submit</button>
      <UsersContainer cable={this.props.cable} users={this.props.users}/>
    </div>
  )
  }
}
export default Home