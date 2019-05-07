import React from 'react';
import { Segment, Grid, Button, Dropdown, Header, Image, Comment } from 'semantic-ui-react'
import { ActionCable } from 'react-actioncable-provider';
import NewMessageForm from './NewMessageForm';
import Moment from 'react-moment';

class ChatsList extends React.Component {


  componentDidMount() {
    // this.props.getChats()
  }


  renderChats = (chatlist) => {
    if (chatlist){
    const container = [];
    const allchats = chatlist
    const entries = Object.entries(allchats)
    for (const [allchat, count] of entries){
      console.log(allchat)
      container.push(
        <Button className={ (!this.props.chatKey[allchat]) || (this.props.chatKey[allchat] == this.props.activeChat) ? 'chatrm-off' : 'chatrm-on'} 
          // color={ (!this.props.chatKey[allchat]) || (this.props.chatKey[allchat] == this.props.activeChat) ? 'black' : 'yellow'}
          name={allchat} onClick={() => this.props.displayMessage(allchat)} name={allchat}>
        <h4>{allchat}</h4>
        <Image.Group size='mini' circular>
        {count.map((user)=> <Image src={user}/>)}
        </Image.Group>
        </Button>
      )
      } return container;
    } else {
      return <h3>No chat yet...</h3>
    }
  }

  getOption = (list) => {
    let options = [];
    for (let i = 0; i < list.length; i++){
        let eachUser = {
        key: list[i].id,
        text: list[i].name,
        value: list[i].id,
        image: { avatar: true, src: list[i].avatar}
      }
     options.push(eachUser)
    } return options;
  }


  render = () => {

    let show_msg;
    if (!this.props.activeChat) {
      show_msg = <h3>Pick a Jar</h3>
    } else {
      (!this.props.messages.length) ?
      show_msg = <div><h3>There is no message yet...</h3></div> :
      show_msg = this.props.messages.map((msg) => { 
      return (

        <Comment>
        <Image size="mini" src={msg[5]} circular/>
        <Comment.Content>
          <Comment.Author>{msg[1]}</Comment.Author>
          <Comment.Metadata>
            <div><Moment fromNow>{msg[3]}</Moment></div>
          </Comment.Metadata>
          <Comment.Text>{msg[2]}</Comment.Text>
        </Comment.Content>
      </Comment>
        //  <div id={msg[0]}>
        //  <span>{msg[1]}:{msg[2]}</span>
        //  <span><Moment fromNow>{msg[3]}</Moment></span>
        //  </div>
      )}
       )
      }


    return (
      <div className="chatsList">
        <ActionCable
          channel={{ channel: 'ChatsChannel', current_user: this.props.current_user }}
          onReceived={(res) => this.props.handleReceivedChats(res)} />
        <ActionCable
          channel={{ channel: 'MessagesChannel', current: this.props.current_user }}
          onReceived={(res) => this.props.handleReceivedMessage(res)} />
        <Grid divided textAlign='left' columns={2}>
        <Grid.Column scrolling width={4}>
        <Header size="large">Chats</Header>
        <Segment>
        {this.renderChats(this.props.chats)}
        </Segment>
        </Grid.Column>
        {this.props.activeChat
         ?<Grid.Column width={12}>
          <Segment>
          <Dropdown
            text='Add user'
            icon='add user'
            floating
            labeled
            button
            className='icon'
          >
          <Dropdown.Menu>
              <Dropdown.Header content='Berries You Connected To' />
              {this.getOption(this.props.friendOptions).map(option => (
                <Dropdown.Item onClick={()=> this.props.addUser(option.value)} key={option.value} {...option} />
              ))}
            </Dropdown.Menu>
          </Dropdown>
            <Button onClick={ () => this.props.leaveChat(this.props.activeChat)}>BYE</Button>
            </Segment>
          <Segment>
            {show_msg}
         {/* <div ref={(el)=> el && el.scrollIntoView({ behavior: "smooth" })}></div> */}
          </Segment>
          <NewMessageForm current_user={this.props.current_user} chat={this.props.activeChat}/> 
          </Grid.Column>
        : <Grid.Column width={12}>
          <Segment textAlign='center'><Header size="huge"> Pick a Jar</Header></Segment>
          </Grid.Column>}
        </Grid>
      </div>
    );
  };
}

export default ChatsList;

