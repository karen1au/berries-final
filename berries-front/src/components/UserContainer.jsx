import { Button, Container, Header, Image, Modal } from 'semantic-ui-react'
import React, { Component } from 'react'
// import Auth from '../services/Auth'
// import { ActionCable } from 'react-actioncable-provider';

class UserContainer extends Component {
  state = {
    genres: [],
    instruments: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/genres/search/?user=${this.props.user.id}`)
    .then(res => res.json())
    .then(genres => {
      let map = genres.map(g => {
        return g.name;
      })
      this.setState({ genres: map }, () => {
        console.log(this.state)
      })
    })

    fetch(`http://localhost:3000/api/v1/instruments/search/?user=${this.props.user.id}`)
    .then(res => res.json())
    .then(instruments => {
      console.log(instruments)
      let map = instruments.map(i => {
        return i.name;
      })
      this.setState({ instruments: map }, () => {
        console.log(this.state)
      })
    })
  }

  render() {
    return( 

      <Modal trigger={<Button>Show</Button>}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src={this.props.user.avatar}/>
          <Modal.Description>
            <Header>{this.props.user.name}</Header>
            <p>{this.props.user.description}</p>
          </Modal.Description>
          <Container>
            <Modal.Description>
              {this.state.genres.map(g => {
                return <Header>{g}</Header>
              })}
            </Modal.Description>
            <Modal.Description>
              {this.state.instruments.map(i => {
                return <Header>{i}</Header>
              })}
            </Modal.Description>
          </Container>
            <iframe id="sc-widget" src="https://w.soundcloud.com/player/?url=http://soundcloud.com/hoodasaurus&amp;color=AF0E49" width="100%" height="350" scrolling="no" frameborder="no"></iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed?listType=user_uploads&list=croutoncrackerjacks" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Modal.Content>
      </Modal>  
      
    )
  }
}

export default UserContainer