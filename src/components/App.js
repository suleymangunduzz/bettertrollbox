import React from 'react';
import styled from 'styled-components';
import MessagesList from './MessagesList';
import MessageForm from './MessageForm';
import UserList from './UserList';

import Preloader from './Preloader';
import crown from '../resources/crown.svg';
import joined from '../resources/joined.svg';
import left from '../resources/left.svg';

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  color: white;
  font-family: Whitney,'Open Sans',Helvetica Neue,Helvetica,Arial,sans-serif;
`;

const LeftPane = styled.div`
  width: 100%;
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  background: #36393f;
`

const App = () => (
  <AppContainer>
    <Preloader content={{
      [crown]: 'image',
      [joined]: 'image',
      [left]: 'image'
    }} />
    <LeftPane>
      <MessagesList />
      <MessageForm />
    </LeftPane>
    <UserList />
  </AppContainer>
);

export default App;
