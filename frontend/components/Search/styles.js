import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.lightgrey};
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid ${props => (props.highlighted ? props.theme.lightgrey : 'white')};
  img {
    margin-right: 10px;
  }
`;


const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  position: relative;
  padding: 1rem;

  input {
  padding: 2rem 2rem;
  width: 450px;
  transition: all .2s;
  line-height:2rem;
  
  @media (min-width: 1025px) {
    display: flex;
    align-items: center;
    width: 500px;
    margin: 0 auto;
    position: relative;
    input {
    padding: 2rem 2rem;
    width: 500px;
    transition: all .2s;
    line-height:2rem;
  }
`;

export { DropDown, DropDownItem, SearchContainer };
