import "../../../node_modules/react-vis/dist/style.css";
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
import regression from "regression";

import Section from "../Section";

export default function Ratings({ responsesQuery }) {
  const [resizeListener, sizes] = useResizeAware();

  return (
    <Section title="Ratings">
      {resizeListener}
      {!responsesQuery.data.length ? (
        <p>No data</p>
      ) : (
        <XYPlot height={300} width={Math.max(sizes.width ?? 300, 700)} yDomain={[1, 5]}>
          <LineSeries
            curve={curveBundle.beta(1)}
            color="black"
            data={responsesQuery.data
              .sort((a, b) => a.info.timestamp - b.info.timestamp)
              .map((response, index) => {
                return { x: index + 1, y: response.info.rating };
              })}
          />

          <LineSeries
            color="orange"
            data={regression
              .polynomial(
                responsesQuery.data
                  .sort((a, b) => a.info.timestamp - b.info.timestamp)
                  .map((response, index) => {
                    return [index + 1, response.info.rating];
                  }),
                {
                  order: responsesQuery.data.length / 3,
                  precision: 300,
                }
              )
              .points.map(([x, y]) => {
                return { x, y };
              })}
          />

          <VerticalGridLines />
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis tickValues={[1, 2, 3, 4, 5]} />
        </XYPlot>
      )}
    </Section>
  );
}
