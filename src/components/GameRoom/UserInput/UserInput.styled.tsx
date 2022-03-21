import styled from '@emotion/styled';
import { ReactComponent as LiefrandoLogo } from '../../../icons/logo.svg';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 0 1rem;
`;

export const Container = styled.div<{ reverse?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ reverse }) => (reverse ? 'flex-end' : 'flex-start')};
  max-width: 40%;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
`;

export const Logo = styled(LiefrandoLogo)`
  width: 3rem;
  height: 3rem;
`;

export const UserSelectionWrapper = styled.div<{ reverse?: boolean }>`
  display: flex;
  justify-content: ${({ reverse }) => (reverse ? 'flex-end' : 'flex-start')};
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
  flex-direction: column;
`;
