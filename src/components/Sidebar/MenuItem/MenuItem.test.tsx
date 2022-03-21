import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MenuItem } from './MenuItem';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import * as reactRedux from 'react-redux';
import * as ws from '../../SocketActions/ws';
import * as gameSlice from '../../../slices/gameSlice';
import * as usersApi from '../../../api/users';
import * as usersSlice from '../../../slices/userSlice';
import * as hooks from '../../../hooks';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockReturnValue('testuser'),
}));

describe('MenuItem', () => {
  it('Should render correctly and handle onClick action', async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => mockDispatch);

    const mockJoinRoom = jest.fn();
    jest.spyOn(ws, 'joinRoom').mockImplementation(mockJoinRoom);

    const onSecondPlayerJoin = jest.fn();
    jest.spyOn(gameSlice, 'onSecondPlayerJoin').mockImplementation(onSecondPlayerJoin);

    const useAllUsersQuery = jest.fn().mockReturnValue({ data: [] });
    jest.spyOn(usersApi, 'useAllUsersQuery').mockImplementation(useAllUsersQuery);

    const onRoomConnectionChange = jest.fn();
    jest.spyOn(usersSlice, 'onRoomConnectionChange').mockImplementation(onRoomConnectionChange);

    jest.spyOn(hooks, 'useSecondPlayerName').mockReturnValue('human');

    render(
      <Provider store={store}>
        <MenuItem
          item={{
            id: 'test',
            name: 'test room',
            owner: 'test owner',
            type: 'human',
          }}
        />
      </Provider>,
    );
    const item = screen.getByText(/test room/i);
    expect(item).toBeInTheDocument();
    fireEvent.click(item);
    await waitFor(() => {
      expect(mockJoinRoom).toHaveBeenCalled();
      expect(onSecondPlayerJoin).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalled();
      expect(onRoomConnectionChange).toHaveBeenCalled();
    });
  });
});
