import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react'
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
      
      <Modal trigger={<Button>Inspect</Button>}>
        <Modal.Header>Profile Picture</Modal.Header>
        <Modal.Content image>
          <Image size='medium' src={this.props.user.avatar} wrapped />
          <Modal.Description>
            <Header as="h1">{this.props.user.name}</Header>
            <p>{this.props.user.description}</p>
            <br/>
            <h3>Genres of Interest:</h3>
            <ul>
              {this.state.genres.map(g => {
                return <li>{g}</li>
              })}
            </ul>
            <br/>
            <h2>The Juice</h2>
            <ul>
              {this.state.instruments.map(i => {
                return <li>{i}</li>
              })}
            </ul>
            <h3>SoundCloud</h3>
            <iframe id="sc-widget" src="https://w.soundcloud.com/player/?url=http://soundcloud.com/hoodasaurus&amp;color=AF0E49" width="100%" height="350" scrolling="no" frameborder="no"></iframe>
            <h3>Youtube</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed?listType=user_uploads&list=croutoncrackerjacks" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button primary>
            Proceed <Icon name='chevron right' />
          </Button>
        </Modal.Actions>
      </Modal>

      // <Modal trigger={<Button>Show</Button>}>
      //   <Modal.Header>Select a Photo</Modal.Header>
      //   <Modal.Content image>
      //     <Image wrapped size='large' src={this.props.user.avatar}/>
      //     <Modal.Description>
      //       <Header>{this.props.user.name}</Header>
      //       <p>{this.props.user.description}</p>
      //     </Modal.Description>
      //     <Modal.Description>
      //       <h1>Genres of Interest</h1>  
      //         <ul>
      //           {this.state.genres.map(g => {
      //             return <li>{g}</li>
      //           })}
      //         </ul>
      //     </Modal.Description>
      //     <Modal.Description>
      //       <h1>Musical Experience</h1>
      //       <ul>
      //         {this.state.instruments.map(i => {
      //           return <li>{i}</li>
      //         })}
      //       </ul>
      //     </Modal.Description>
      //       {/* <iframe id="sc-widget" src="https://w.soundcloud.com/player/?url=http://soundcloud.com/hoodasaurus&amp;color=AF0E49" width="100%" height="350" scrolling="no" frameborder="no"></iframe> */}
      //       {/* <iframe width="560" height="315" src="https://www.youtube.com/embed?listType=user_uploads&list=croutoncrackerjacks" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
      //   </Modal.Content>
      // </Modal>  
      
    )
  }
}

export default UserContainer