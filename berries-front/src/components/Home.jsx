import React, { Component } from 'react'
import UsersContainer from './UsersContainer'
import SearchContainer from './search/SearchContainer'


class Home extends Component {

// onClick = () => {
//   this.props.queryResults()
// }

  render() {
    return (
      <div>
        <SearchContainer handleSelection={this.props.handleSelection}/>
        <button type="submit" onClick={this.props.queryResults}>Submit</button>
        <UsersContainer grabUserID={this.props.grabUserID} cable={this.props.cable} users={this.props.users}/>
      </div>
    )
  }
}
export default Home