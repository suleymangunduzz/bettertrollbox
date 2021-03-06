import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import User from './User';
import autoScroller from './AutoScroller';
import { unescapeText, unescapeText2 } from '../utils';

import joined from '../resources/joined.svg';
import left from '../resources/left.svg';

const MessagesScroller = styled.div`
  &::-webkit-scrollbar {
    width: 14px;
  }

  &::-webkit-scrollbar-thumb, &::-webkit-scrollbar-track-piece {
    background-clip: padding-box;
    border: 3px solid;
    border-radius: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: #202225;
    border-color: #36393f;
  }

  &::-webkit-scrollbar-track-piece {
    background-color: #2f3136;
    border-color: #36393f;    
  }
`;

const MessagesListContainer = styled(autoScroller(MessagesScroller))`
  height: 100%;
  flex: 0 1 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const Message = styled.div`
  margin: 0 6px 0 20px;
  padding: 9px 0;
  border-bottom: 1px solid;
  border-bottom-color: hsla(0,0%,100%,.04);
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  align-items: ${props => props.center ? 'center' : 'baseline'};
  color: hsla(0,0%,100%,.7);
  font-size: 0.9375rem;

  & ${User} {
    flex: 0 0 auto;
    max-width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const PaddedText = styled.span`
  padding-right: 5px;
`;

const Timestamp = styled(PaddedText).attrs({
  children: ({ date }) => (
    <React.Fragment>
      <HighlightSep style={{ position: "initial" }}>[</HighlightSep>{moment(date).format('hh:mm A')}<HighlightSep>] </HighlightSep>
    </React.Fragment>
  )
})`
  flex: 0 0 auto;
  font-size: 0.6875rem;
  line-height: 1rem;
  overflow: hidden;
  text-align: right;  
  width: 65px;
  color: hsla(0,0%,100%,.2);

  ${Message}:hover & {
    color: #99aab5;
  }
`;

const PaddedUser = styled(User)`
  padding-right: 5px;
`;

const MessageText = styled.span`
  font-family: 'Ubuntu Mono', monospace;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  hyphens: auto;
`;

const HighlightSep = styled.span`
  position: absolute;
  opacity: 0;
  width: 0;
`;

const Icon = styled.img.attrs({
  width: 16,
  height: 16
})`
  margin-right: 8px;
`;

const MessagesList = ({ messages }) => (
  <MessagesListContainer>
    {messages.map((msg, i) =>
        msg.type === 'changed nick' ? (
          <Message key={i}>
            <Timestamp date={msg.date} />
            <PaddedUser color={msg.oldUser.color}>{unescapeText(msg.oldUser.nick)} </PaddedUser>
            <PaddedText>is now </PaddedText>
            <User color={msg.newUser.color}>{unescapeText(msg.newUser.nick)}</User>
          </Message>
        ) : msg.type === 'message' ? (
          <Message key={i}>
            <Timestamp date={msg.date} />
            <PaddedUser color={msg.color}>{unescapeText(msg.nick)}<HighlightSep>: </HighlightSep></PaddedUser>
            <MessageText dangerouslySetInnerHTML={{__html: unescapeText2(msg.msg)}} />
          </Message>
        ) : msg.type === 'joined' ? (
          <Message center key={i}>
            <Icon src={joined} alt="Joined" />
            <PaddedUser color={msg.color}>{unescapeText(msg.nick)}</PaddedUser> joined the Trollbox.
          </Message>
        ) : msg.type === 'left' ? (
          <Message center key={i}>
            <Icon src={left} alt="Left" />
            <PaddedUser color={msg.color}>{unescapeText(msg.nick)}</PaddedUser> left the Trollbox.
          </Message>
        ) : (
          <Message key={i}>
            <PaddedUser color={msg.color}>{unescapeText(msg.nick)} </PaddedUser>
            <span>{msg.type}</span>
          </Message>
        )
    )}
  </MessagesListContainer>
);

const mapStateToProps = ({ messages }) => ({
  messages
});

export default connect(mapStateToProps)(MessagesList)
