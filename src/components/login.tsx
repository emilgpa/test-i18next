/// <reference types="gapi.auth2" />

import * as React from "react"
import * as ReactDOM from "react-dom"
import {connect} from 'react-redux';
import styled from 'styled-components'
import { withNamespaces, TransProps } from 'react-i18next';
import { withRouter, RouteComponentProps } from "react-router-dom";

import * as actions from '../store/actions/index';
import {IUserStore, IAuthStore} from '../store/types';

interface IState {
    error: {type: string, msg: string} | null
}

export const LoginButton = styled.button`
    color: #FFF;
    padding: 5px;
`

const ContError = styled.div`
    margin-top: 20px;
    p {
        color: red;
    }
`

type IProps = IUserStore & IAuthStore & RouteComponentProps & TransProps

class Login extends React.Component<IProps, IState> {
    loginButton = React.createRef<HTMLButtonElement>();

    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
    }

    loginSuccess = (user: gapi.auth2.GoogleUser) => {
        var profile = user.getBasicProfile();
        this.props.fetchUser!(profile);
        console.log(profile);
    }

    loginFailure = (err) => {
        console.error("error al loguear", err);
        this.props.fetchUser!(null)
        const error = {type: "login", msg: err};
        this.setState({error})
    }

    componentDidMount() {
        const {auth} = this.props;
        // incluir el clickHandler de Google en el componente LoginButton
        auth!.auth!.attachClickHandler(this.loginButton.current, {}, this.loginSuccess, this.loginFailure);
    }

    render() {
        const {t} = this.props;
        const {error} = this.state;
        console.warn("render login.tsx")
        return (
            <>
                <h2>{t!("login").toUpperCase()}</h2>
                <div>
                    <LoginButton id="signin" ref={this.loginButton}>{t!("loginGoogle")}</LoginButton>
                </div>
                {error &&
                    <ContError>
                        <p>{error.type == "login" ? t!("errorLogin") : t!("errorDesconocido")}</p>
                    </ContError>
                }
            </> 
        )
    }
}

const mapStateToProps = ({auth}) => {
    return {auth};
}
export default withRouter<any>(connect(mapStateToProps, actions)(withNamespaces('translation')(Login)));
