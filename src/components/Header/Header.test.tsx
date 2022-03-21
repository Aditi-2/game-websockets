import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as reactRedux from 'react-redux';
import { Header } from './Header';
import { store } from '../../store/store';
import * as hooks from '../../hooks';

describe('Header', () => {
  it('Should render login text', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const item = screen.getByText(/Login/i);
    expect(item).toBeInTheDocument();
  });

  it('Should render join a room text', async () => {
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue({
      username: 'user',
    });
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const item = screen.getByText(/Join a room to play/i);
    expect(item).toBeInTheDocument();
  });

  it('Should render playing with text', async () => {
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue({
      username: 'user',
      roomSelected: true,
      room: 'abc',
      roomType: 'cpu',
    });
    jest.spyOn(hooks, 'useSecondPlayerName').mockReturnValue('CPU');
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const item = screen.getByText(/Playing with CPU/i);
    expect(item).toBeInTheDocument();
  });

  it('Should render waiting for second player text', async () => {
    jest.spyOn(reactRedux, 'useSelector').mockReturnValue({
      username: 'user',
      roomSelected: true,
      room: 'abc',
      roomType: 'human',
    });
    jest.spyOn(hooks, 'useSecondPlayerName').mockReturnValue(undefined);

    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );
    const item = screen.getByText(/Waiting for other players/i);
    expect(item).toBeInTheDocument();
  });
});
