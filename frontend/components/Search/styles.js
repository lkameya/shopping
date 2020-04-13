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
  width: 500px;
  margin-left: 200px;
  input {
    padding: .7rem 2rem;
    width: 90%;
    transition: all .2s;
  }
`;

export { DropDown, DropDownItem, SearchContainer };
