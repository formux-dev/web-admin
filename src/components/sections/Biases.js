import styled from "styled-components";

import Section from "../Section";

export default function Biases({ biasesQuery }) {
  const getBiasColor = bias => {
    bias *= 4;

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

  return (
    <Section>
      <h2>Biases</h2>
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
                      <p>{option.rating}</p>
                    </li>
                  );
                })}
              </OptionsList>
            </li>
          );
        })}
      </FeatureList>
    </Section>
  );
}

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
