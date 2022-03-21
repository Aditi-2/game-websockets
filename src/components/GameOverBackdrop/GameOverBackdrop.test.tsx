import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import { store } from '../../store/store';
import { GameOverBackdrop } from './GameOverBackdrop';
import * as gameSlice from '../../slices/gameSlice';

describe('GameOverBackdrop', () => {
  it('Should render correctly and handle onClick event', async () => {
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue('win');

    const mockDispatch = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => mockDispatch);

    const resetGame = jest.fn();
    jest.spyOn(gameSlice, 'resetGame').mockImplementation(resetGame);

    render(
      <Provider store={store}>
        <GameOverBackdrop />
      </Provider>,
    );
    const item = screen.getByText(/You win/i);
    expect(item).toBeInTheDocument();
    fireEvent.click(item);
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(resetGame).toHaveBeenCalled();
    });
  });
});
