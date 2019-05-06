import React, { Component } from 'react'
import UsersContainer from './UsersContainer'
import SearchContainer from './search/SearchContainer'
import { Container } from 'semantic-ui-react'


class Home extends Component {

// onClick = () => {
//   this.props.queryResults()
// }

  render() {
    return (
      <div>
        <Container className="search-container">
          <SearchContainer handleSelection={this.props.handleSelection}/>
          <button className="ui button" type="submit" onClick={this.props.queryResults}>Submit</button>
        </Container>
        <UsersContainer grabUserID={this.props.grabUserID} cable={this.props.cable} users={this.props.users}/>
      </div>
    )
  }
}
export default Home