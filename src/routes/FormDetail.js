import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Fragment } from "react";

import { getResponses, getForm, getBiases } from "../queries/client";

import Biases from "../components/sections/Biases";
import Ratings from "../components/sections/Ratings";
import Responses from "../components/sections/Responses";

export default function FormInfo() {
  let { formId } = useParams();

  const formQuery = useQuery(["form", formId], getForm);
  const responsesQuery = useQuery(["responses", formId], getResponses);
  const biasesQuery = useQuery(["biases", formId], getBiases);

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

      <IdPill>ID {formId}</IdPill>
      <h1>{formQuery.data.meta.title ?? "Untitled"}</h1>
      <p>{formQuery.data.meta.description ?? "No description"}</p>

      <Biases biasesQuery={biasesQuery} />
      <Ratings responsesQuery={responsesQuery} />
      <Responses formQuery={formQuery} responsesQuery={responsesQuery} />
    </div>
  );
}

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

const IdPill = styled.p`
  display: inline-block;
  background: #ededed;
  border-radius: 99px;
  padding: 4px 12px;
  margin-bottom: 32px;
`;
