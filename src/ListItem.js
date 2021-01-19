import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ListItem({ id, title }) {
  return (
    <StyledListItem>
      <Link to={"/" + id}>
        <h2>{title}</h2>
        <img src="/arrow-right.svg" alt="right arrow" />
      </Link>
    </StyledListItem>
  );
}

const StyledListItem = styled.li`
  & a {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  list-style-type: none;

  border-bottom: 1.5px solid lightgrey;
  padding: 8px 0;

  &:last-child {
    border: none;
  }
`;
