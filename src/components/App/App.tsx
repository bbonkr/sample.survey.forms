import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AsyncComponent, LoadingComponent } from '../AsyncComponent';

const Header = AsyncComponent(() => import('../Header'), {
    resolveComponent: (props) => props.Header,
    fallback: <LoadingComponent />,
});

const Home = AsyncComponent(() => import('../Home'), {
    resolveComponent: (props) => props.Home,
    fallback: <LoadingComponent />,
});

const About = AsyncComponent(() => import('../About'), {
    resolveComponent: (props) => props.About,
    fallback: <LoadingComponent />,
});

const Survey = AsyncComponent(() => import('../SurveyForm'), {
    resolveComponent: (props) => props.SurveyForm,
    fallback: <LoadingComponent />,
});

const SurveyFormGenerator = AsyncComponent(
    () => import('../SurveyFormGenerator'),
    {
        resolveComponent: (props) => props.SurveyGeneratorForm,
        fallback: <LoadingComponent />,
    },
);

const PageNotFound = AsyncComponent(() => import('../PageNotFound'), {
    resolveComponent: (props) => props.PageNotFound,
    fallback: <LoadingComponent />,
});

const helmetContext = {};

export const App = () => {
    return (
        <HelmetProvider context={helmetContext}>
            <Router>
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/about" exact>
                        <About />
                    </Route>
                    <Route path="/survey" exact>
                        <Survey />
                    </Route>
                    <Route path="/generator" exact>
                        <SurveyFormGenerator />
                    </Route>
                    <Route path="/404" exact>
                        <PageNotFound />
                    </Route>
                    <Route
                        path="*"
                        render={(props) => (
                            <Redirect
                                to={{
                                    pathname: '/404',
                                    state: { from: props.location },
                                }}
                            />
                        )}
                    ></Route>
                </Switch>
            </Router>
        </HelmetProvider>
    );
};
