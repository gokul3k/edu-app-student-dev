import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import { NotFound } from '../pages';
import { requireLogin, waitOneSecond } from './guards';
import getRoutes from './routes';

const GLOBAL_GUARDS = [requireLogin];

const Router = () => {
    const routes = useMemo(() => getRoutes(), []);
    return (
        <BrowserRouter>
            <GuardProvider guards={GLOBAL_GUARDS} error={NotFound}>
                <Switch> 
                    <Redirect exact path='/' to="/home" />
                    {routes.map(
                        (
                            {
                                component,
                                error,
                                exact,
                                ignoreGlobal,
                                loading,
                                meta,
                                path,
                            },
                            i
                        ) => (
                            <GuardedRoute
                                key={i}
                                component={component}
                                exact={exact}
                                error={error}
                                ignoreGlobal={ignoreGlobal}
                                loading={loading}
                                meta={meta}
                                path={path}
                            />
                        )
                    )}
                </Switch>
            </GuardProvider>
        </BrowserRouter>
    );
};

export default Router;
