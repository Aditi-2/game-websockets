import * as React from 'react';
import { Wrapper, GameWrapper } from './Home.styled';
import { Sidebar } from '../Sidebar/Sidebar';
import { GameRoom } from '../GameRoom/GameRoom';

export const Home = () => (
  <Wrapper>
    <Sidebar />
    <GameWrapper>
      <GameRoom />
    </GameWrapper>
  </Wrapper>
);
