import { useQuery } from "react-query";

import { getForms } from "../queries/client";
import ListItem from "../ListItem";

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
      {data.forms.map(({ id, title }) => {
        return <ListItem id={id} title={title} />;
      })}
    </ul>
  );
}
