/*
*  contains all the styling
*/
import styled from 'styled-components';

export const DIV = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-sizing: border-box;
  font-family: "Helvetica", Arial, sans-serif;
  font-size: 16px;
  a{
      text-decoration:none;
      color:#3c3c3c;
  }
`;

export const IMG = styled.img`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;

export const H1 = styled.h1`
  font-size: 36px;
  text-align: center;
  @media (max-width:640px) and (min-width:375px){
    font-size: 24px;
  }
  @media (max-width: 375px){
    font-size: 20px;
  }
`;

export const H2 = styled.h2`
  font-size: 32px;
  text-align: center;
  @media (max-width:640px) and (min-width:375px){
    font-size: 18px;
  }
  @media (max-width: 375px){
    font-size: 16px;
  }
`;

export const SMALL = styled.small`
  text-align: center;
  font-size: 14px;
  color: #3c3c3c;
  @media (max-width:640px){
    font-size:12px;
  }
`;

export const INPUT = styled.input`
  width: 120px;
  height: 24px;
  border: 1px solid #e8e6e6;
  border-radius: 1.5px;
  box-shadow: inset 0 1px 3px rgba(0,0,0,.06);
  margin-left: 3px;
  text-align: center;
`;

export const P = styled.p`
    font-weight: 400;
    line-height: 1.43;
    letter-spacing: -.013em;
`;