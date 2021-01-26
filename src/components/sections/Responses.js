import styled from "styled-components";

import Section from "../Section";

export default function Responses({ formQuery, responsesQuery }) {
  return (
    <Section title="Responses">
      {!responsesQuery.data.length ? (
        <p>No data</p>
      ) : (
        <Table>
          <thead>
            <tr>
              {formQuery.data.blocks &&
                formQuery.data.blocks
                  .filter(block => block.key)
                  .map(block => {
                    return <th>{block.key}</th>;
                  })}
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {responsesQuery.data.map(response => {
              return (
                <tr>
                  {formQuery.data.blocks
                    .filter(block => block.key)
                    .map(block => {
                      return response.data.find(resposeBlock => resposeBlock.key === block.key)
                        ?.value;
                    })
                    .map(response => {
                      return Array.isArray(response) ? response.join(", ") : response;
                    })
                    .map(response => {
                      return <td>{response}</td>;
                    })}
                  <td>
                    <StarContainer>
                      {[...Array(5)].map((_, i) =>
                        i >= response.info.rating ? (
                          <img src="/star.svg" alt="star" />
                        ) : (
                          <img src="/star-filled.svg" alt="filled star" />
                        )
                      )}
                    </StarContainer>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Section>
  );
}

const Table = styled.table`
  text-align: left;
  border-collapse: collapse;
  width: 100%;

  & td,
  th {
    padding: 4px;
    border: 1px solid grey;
    min-width: 150px;
  }
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
