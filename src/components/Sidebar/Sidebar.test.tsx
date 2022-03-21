import { render, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import * as roomsApi from '../../api/rooms';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import * as hooks from '../../hooks';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockReturnValue('testuser'),
}));

describe('Sidebar', () => {
  it('Should render all rooms correctly', () => {
    jest.spyOn(roomsApi, 'useAllRoomsQuery').mockReturnValue({
      data: [
        {
          id: 'd2726a4a',
          name: 'Room Berlin CPU',
          owner: 'I0yZ-jSTAGV8xTNkAAAD',
          type: 'cpu',
        },
        {
          id: 'aa0c86fa',
          name: 'Room Izmir CPU',
          owner: 'lqcflVIEANZWYkmAAAAC',
          type: 'cpu',
        },
        {
          id: 'aa0c86fa',
          name: 'Room Amsterdam',
          owner: 'lqcflVIEANZWYkmAAADD',
          type: 'human',
        },
      ],
    } as never);
    jest.spyOn(hooks, 'useSecondPlayerName').mockReturnValue('');
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>,
    );
    expect(screen.getByText(/Choose you game room/i)).toBeInTheDocument();
    expect(screen.getByText(/Room Berlin CPU/i)).toBeInTheDocument();
    expect(screen.getByText(/Room Izmir CPU/i)).toBeInTheDocument();
    expect(screen.getByText(/Room Amsterdam/i)).toBeInTheDocument();
  });
});
