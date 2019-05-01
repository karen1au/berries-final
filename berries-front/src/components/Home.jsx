import React, { Component } from 'react'
import UsersContainer from './UsersContainer'
import SearchContainer from './search/SearchContainer'
import ProfileEdit from './ProfileEdit'


class Home extends Component {
render(){
  return (
    <div>
      <ProfileEdit />
      <SearchContainer handleSelection={this.props.handleSelection}/>
      <button type="submit" onClick={this.props.queryResults}>Submit</button>
      <UsersContainer users={this.props.users}/>
    </div>
  )
  }
}
export default Home