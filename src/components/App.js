import { ReactQueryDevtools } from "react-query-devtools";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import GlobalStyle from "../globalStyles";

import Wrapper from "./Wrapper";
import List from "../routes/List";
import FormInfo from "../routes/FormDetail";

export default function App() {
  return (
    <div>
      <GlobalStyle />
      <ReactQueryDevtools initialIsOpen={false} />

      <Router>
        <Switch>
          <Route path="/:formId">
            <Wrapper wide>
              <FormInfo />
            </Wrapper>
          </Route>
          <Route path="/">
            <Wrapper>
              <List />
            </Wrapper>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
