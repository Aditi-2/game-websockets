import styled from '@emotion/styled';
import { ReactComponent as LiefrandoLogo } from '../../icons/logo.svg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 0 1rem;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 40%;
`;

export const Logo = styled(LiefrandoLogo)`
  width: 3rem;
  height: 3rem;
`;

export const UserSelection = styled.div`
  border-radius: 50%;
  background-color: #205a6d;
  padding: 1.5rem;
  text-align: center;
  margin-top: 0.5rem;
  color: #fff;
  max-width: 2rem;
`;

export const CalculationContainer = styled.div`
  border-radius: 50%;
  background-color: #f8f5f2;
  border-radius: 2px;
  width: 10rem;
  color: #0a3847;
  padding: 1rem;
  margin: 1rem 0;
`;

export const UserInputContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const GameRoomMovesContainer = styled.div`
  height: 32em;
  overflow-x: hidden;
  overflow-y: auto;
  margin-bottom: 5em;
`;
