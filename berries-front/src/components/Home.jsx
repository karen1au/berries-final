import React, { Component } from 'react'
import UsersContainer from './UsersContainer'
import SearchContainer from './search/SearchContainer'
import { Container } from 'semantic-ui-react'


class Home extends Component {

  render() {
    return (
      <div>
        <Container>
          <SearchContainer handleSelection={this.props.handleSelection} queryResults={this.props.queryResults}/>
        </Container>
        <UsersContainer grabUserID={this.props.grabUserID} cable={this.props.cable} users={this.props.users}/>
      </div>
    )
  }
}
export default Home