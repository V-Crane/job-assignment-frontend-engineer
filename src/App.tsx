import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

import Article from "./pages/Article/Article";
import { ArticleList } from "./pages/ArticleList/ArticleList";
import Editor from "./Editor";
import Logout from "./Logout";
import { Profile } from "./pages/Profile/Profile";
import Settings from "./Settings";
import { PageLayout } from "./components/PageLayout/PageLayout";
import { LoginRegister } from "./pages/LoginRegister/LoginRegister";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <UserProvider>
      <Router>
        <PageLayout>
          <Switch>
            <ProtectedRoute path="/editor" exact component={Editor} />
            <ProtectedRoute path="/editor/:slug" exact component={Editor} />
            <Route path="/login" exact component={LoginRegister} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/profile/:username" exact component={Profile} />
            <Route path="/profile/:username/favorites" exact component={Profile} />
            <Route path="/register" exact component={LoginRegister} />
            <ProtectedRoute path="/settings" exact component={Settings} />
            <Route path="/:slug" exact component={Article} />
            <Route path="/" exact component={ArticleList} />
          </Switch>
        </PageLayout>
      </Router>
    </UserProvider>
  );
}

export default App;
