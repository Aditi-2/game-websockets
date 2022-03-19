import styled from "@emotion/styled";
import { ReactComponent as LiefrandoLogo } from '../../icons/logo.svg';

export const Wrapper = styled.div`
display: flex;
width: 100%;
background-color: #FF8000;
padding: 1rem;
align-items: center;
box-shadow: 0px 3px 3px rgba(29, 33, 55, 0.12), 0px 3px 4px rgba(29, 33, 55, 0.14), 0px 1px 8px rgba(29, 33, 55, 0.12);
`; 

export const Logo = styled(LiefrandoLogo)`
width: 3rem;
height: 3rem;
`; 

export const StyledWrapper = styled.div`
display: flex;
flex-direction: column;
padding-left: 1rem;
`;
export const Title = styled.h1`
color: #FFFFFF;
font-weight: 700;
font-size: 18px;
line-height: 20px;
margin: 0;
`; 

export const Moto = styled.p`
color: #FFFFFF;
margin: 0;
font-weight: 400;
font-size: 14px;
line-height: 24px;
`; 