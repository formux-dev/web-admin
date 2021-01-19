import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import "../../node_modules/react-vis/dist/style.css";
import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
} from "react-vis";
import useResizeAware from "react-resize-aware";
import { curveBundle } from "d3-shape";

import { getResponses, getForm } from "../queries/client";

export default function FormInfo() {
  let { formId } = useParams();

  const responsesQuery = useQuery(["responses", formId], getResponses);
  const formQuery = useQuery(["form", formId], getForm);

  const [resizeListener, sizes] = useResizeAware();

  if (responsesQuery.isLoading || formQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (responsesQuery.error || formQuery.error) {
    return (
      <p>
        Error: {responsesQuery.error.message} {formQuery.error.message}
      </p>
    );
  }

  return (
    <div>
      <BackButton to="/">
        <img src="/arrow-left.svg" alt="left" />
        <h2>Back</h2>
      </BackButton>
      <h1>{formQuery.data.meta.title}</h1>
      <p>{formQuery.data.meta.description}</p>

      <Section>
        <h2>Bias</h2>
      </Section>

      <Section>
        {resizeListener}
        <h2>Ratings trend</h2>
        <XYPlot height={300} width={Math.max(sizes.width ?? 300, 700)}>
          <LineSeries
            color="grey"
            // barWidth={0.1}
            data={responsesQuery.data
              .sort((a, b) => a.info.timestamp - b.info.timestamp)
              .map((response, index) => {
                return { x: index, y: response.info.rating };
              })}
          />
          <LineSeries
            curve={curveBundle.beta(0.2)}
            color="red"
            data={responsesQuery.data
              .sort((a, b) => a.info.timestamp - b.info.timestamp)
              .map((response, index) => {
                return { x: index, y: response.info.rating };
              })}
          />

          <VerticalGridLines />
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis tickValues={[1, 2, 3, 4, 5]} />
        </XYPlot>
      </Section>

      <Section>
        <h2>Responses</h2>
        <Table>
          <thead>
            <tr>
              {formQuery.data.blocks
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
      </Section>
    </div>
  );
}

const Table = styled.table`
  text-align: left;
  border-collapse: collapse;

  & td,
  th {
    padding: 4px;
    border: 1px solid grey;
    min-width: 130px;
  }
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BackButton = styled(Link)`
  display: flex;
  flex-direction: row;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  gap: 1em;
  margin-bottom: 32px;
`;

const Section = styled.section`
  position: relative;
  margin: 64px 0;

  overflow-x: scroll;
`;
