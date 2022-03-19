import * as React from 'react';
import { Header } from '../Header/Header';
import { Wrapper, GameWrapper } from './Home.styled';
import { Sidebar } from '../sidebar/Sidebar';
import { GameRoom } from '../GameRoom/GameRoom';

export const Home = () => (
  <Wrapper>
    <Sidebar />
    <GameWrapper>
      <GameRoom />
    </GameWrapper>
  </Wrapper>
);
