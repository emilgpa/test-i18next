import * as React from "react"
import * as ReactDOM from "react-dom"
import {Redirect, Route, RouteComponentProps, RouteProps, withRouter } from "react-router";
import {connect} from 'react-redux';
import { withNamespaces, TransProps } from 'react-i18next';

import * as actions from '../../store/actions/index';
import {urls} from "./urls";
import { IAuthStore } from "../../store/index";

interface IBaseProps {
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    render?: (props) => React.ReactNode
}

type IProps = IBaseProps & RouteProps & IAuthStore

class PrivateRoute extends React.Component<IProps, {}> {
    constructor(props) {
        super(props)
    }

    _render(props: any) {
        const {component, render, children} = this.props;
        if (component) {
            return React.createElement(component, props, children);
        }
        if (render) {
            return render(props);
        }
    }

    _redirect(props) {
        //this.props.userStore!.setUsername("");
        return (
            <Redirect
                to={{
                    pathname: urls.login,
                    state: {from: props.location}
                }}
            />
        )
    }

    render() {
        const {
            auth,
            render,
            ...rest
        } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    auth!.user ? (
                        this._render(props)
                    ) : (
                        this._redirect(props)
                    )
                }
            />
        )
    }
}

const mapStateToProps = ({app, auth, data}) => {
    return {app, auth, data};
}
export default withRouter<any>(connect(mapStateToProps, actions)(withNamespaces('translation')(PrivateRoute)));