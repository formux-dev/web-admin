import { useQuery } from "react-query";

import { getForms } from "../queries/client";
import ListItem from "../components/ListItem";

export default function List() {
  const { isLoading, error, data } = useQuery("forms", getForms, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {data.map(({ formId, title }) => {
        return <ListItem formId={formId} title={title} />;
      })}
    </ul>
  );
}
