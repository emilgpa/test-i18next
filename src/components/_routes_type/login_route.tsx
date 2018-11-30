import * as React from "react"
import * as ReactDOM from "react-dom"
import {Redirect, Route, RouteComponentProps, RouteProps, withRouter } from "react-router";
import {connect} from 'react-redux';
import { withNamespaces, TransProps } from 'react-i18next';

import * as actions from '../../store/actions/index';
import {urls} from "./urls";
import { IAuthStore } from "../../store/index";

type Mutable<T> = {
    -readonly[P in keyof T]: T[P]
};

interface IBaseProps {
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    render?: (props) => React.ReactNode
}

type IProps = IBaseProps & RouteProps & IAuthStore

class LoginRoute extends React.Component<IProps, {}> {
    constructor(props) {
        super(props)
    }

    _render(props) {
        const {component, render, children} = this.props;
        if (component) {
            return React.createElement(component, props, children);
        }
        if (render) {
            return render(props);
        }
    }

    _redirect(props) {
        console.warn("ya está logueado...");
        return (
            <Redirect
                to={{
                    pathname: urls.base,
                    state: {from: props.location}
                }}
            />
        )
    }

    render() {
        const {
            component,
            render,
            path,
            auth,
            ...rest
        } = this.props;
        return (
            <Route
                {...rest}
                path="/login"
                render={props =>
                    auth!.user ? (
                        this._redirect(props)
                    ) : (
                        this._render(props)
                    )
                }
            />
        )
    }
}

//export default LoginRoute
const mapStateToProps = ({app, auth, data}) => {
    return {app, auth, data};
}
export default withRouter<any>(connect(mapStateToProps, actions)(withNamespaces('translation')(LoginRoute)));
