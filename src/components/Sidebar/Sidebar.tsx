import React from 'react';
import { useAllRoomsQuery } from '../../api/rooms';
import { MenuItem } from './MenuItem/MenuItem';
import { Wrapper, Title } from './Sidebar.styled';

export const typeOfRooms = ['Berlin CPU', 'Amsterdam CPU', 'Sabrican'];

export const Sidebar = () => {
  const { data = [] } = useAllRoomsQuery();
  return (
    <Wrapper>
      <Title>Choose you game room</Title>
      {data.map((room) => (
        <MenuItem item={room} key={room.name} />
      ))}
    </Wrapper>
  );
};
