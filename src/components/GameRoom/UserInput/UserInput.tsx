import * as React from 'react';
import { GameMove } from '../../../types/common';
import {
  Container,
  Logo,
  UserSelectionWrapper,
  UserSelection,
  CalculationContainer,
  UserInputContainer,
} from './UserInput.styled';

type UserInputProps = { reverse?: boolean; move: GameMove; isFirstNumber?: boolean };

/**
 * Note: Forward ref is used to wrap the component so we can pass the ref down
 */
export const UserInput = React.forwardRef<HTMLDivElement, UserInputProps>(
  (props: UserInputProps, ref) => {
    const { move, reverse = false, isFirstNumber = false } = props;
    const equation = isFirstNumber
      ? 'First Number'
      : `[ ( ${move.selectedNumber} + ${move.number}) / 3] = ${move.result}`;
    const newNumber = ` ${move.isCorrectResult ? move.result : move.number} `;
    return (
      <Container reverse={reverse} ref={ref}>
        <Logo />
        <UserInputContainer>
          <UserSelectionWrapper reverse={reverse}>
            <UserSelection>{move.selectedNumber}</UserSelection>
          </UserSelectionWrapper>
          <CalculationContainer> {equation}</CalculationContainer>
          <CalculationContainer> {newNumber}</CalculationContainer>
        </UserInputContainer>
      </Container>
    );
  },
);
