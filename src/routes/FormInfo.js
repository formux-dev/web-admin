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

import { getResponses, getForm, getBiases } from "../queries/client";
import { Fragment } from "react";

export default function FormInfo() {
  let { formId } = useParams();

  const formQuery = useQuery(["form", formId], getForm);
  const responsesQuery = useQuery(["responses", formId], getResponses);
  const biasesQuery = useQuery(["biases", formId], getBiases, {
    onSuccess: data => console.log(data),
  });

  const [resizeListener, sizes] = useResizeAware();

  const getBiasColor = bias => {
    bias *= 20;

    var r,
      g,
      b = 0;
    if (bias < 50) {
      r = 255;
      g = Math.round(5.1 * bias);
    } else {
      g = 255;
      r = Math.round(510 - 5.1 * bias);
    }
    var h = r * 0x10000 + g * 0x100 + b * 0x1;
    return "#" + ("000000" + h.toString(16)).slice(-6);
  };

  if (formQuery.isLoading || responsesQuery.isLoading || biasesQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (formQuery.error || responsesQuery.error || biasesQuery.error) {
    return (
      <Fragment>
        {formQuery.error && <p>Error: {formQuery.error.message}</p>}
        {responsesQuery.error && <p>Error: {responsesQuery.error.message}</p>}
        {biasesQuery.error && <p>Error: {biasesQuery.error.message}</p>}
      </Fragment>
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
        <FeatureList>
          {biasesQuery.data.map(feature => {
            return (
              <li>
                <h3>{feature.name}</h3>
                <OptionsList>
                  {feature.options.map(option => {
                    return (
                      <li style={{ background: getBiasColor(option.rating) }}>
                        <strong>{option.value.toString()}</strong>
                        <p>{option.rating.toFixed(2)}</p>
                      </li>
                    );
                  })}
                </OptionsList>
              </li>
            );
          })}
        </FeatureList>
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

const FeatureList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;

  & li {
    border-radius: 16px;
    padding: 8px 16px;
    background: #ededed;
    gap: 16px;

    & h3 {
      margin-bottom: 8px;
    }
  }
`;

const OptionsList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  gap: 8px;

  & li {
    padding: 4px 8px;
    text-align: center;
    border-radius: 4px;
  }
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
  overflow-x: auto;

  & > h2 {
    margin-bottom: 8px;
  }
`;
