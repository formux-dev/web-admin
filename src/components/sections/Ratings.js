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

import Section from "../Section";

export default function Ratings({ responsesQuery }) {
  const [resizeListener, sizes] = useResizeAware();

  return (
    <Section>
      {resizeListener}
      <h2>Ratings trend</h2>
      {!responsesQuery.data.length ? (
        <p>No data</p>
      ) : (
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
      )}
    </Section>
  );
}
