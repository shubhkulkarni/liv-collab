import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { appRouter } from "./router.config";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {appRouter.map((props) => {
          return <Route key={props.path} {...props} />;
        })}
        <Redirect from="/" to="/home" />
        <Route render={() => <div>Page not found :(</div>} />{" "}
        {/* <Redirect to='/'/> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
