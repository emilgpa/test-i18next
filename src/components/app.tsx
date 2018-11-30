/// <reference types="gapi.auth2" />

import * as React from "react"
import * as ReactDOM from "react-dom"
import {connect} from 'react-redux';
import styled from 'styled-components'
import { withNamespaces, TransProps } from 'react-i18next';
import { withRouter, RouteComponentProps, Switch, Redirect } from "react-router-dom";
import Async from 'react-code-splitting'

import * as actions from '../store/actions/index';
import {IUserStore, IAuthStore, IAppStore} from '../store/types';
import {LoginRoute, PrivateRoute} from "./_routes_type/index"

//import {LoginLoadable as Login, HomeLoadable as Home} from "./index"

const Login = () => <Async load={import(/* webpackChunkName: "login" */ './login')} />
const Home = () => <Async load={import(/* webpackChunkName: "home" */ './home')} />

type error = {type: string, msg: string}

interface IState {
    error: error | null
}

const Main = styled.div`
    padding: 15px;
`

type IProps = IUserStore & IAuthStore & IAppStore & TransProps & RouteComponentProps

class App extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
        }
    }

    componentDidMount() {
        console.warn("app mounted");
        // se inicializa la app aqui
        this.init();
    }

    loadGapi() {
        const {fetchAuth, fetchUser} = this.props;
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://apis.google.com/js/platform.js";
        document.querySelector("head")!.append(script);
        
        const loaded = () => {
            gapi.load('auth2', () => {
                // inicializar el auth2 de Google pasándole el client_id
                gapi.auth2.init({client_id: "295036914881-d6eg0bhn5dbj648lu5b8m1td2vpnkuph.apps.googleusercontent.com"}).
                then(async auth2 => {
                    console.log("¡google API iniciada con exito!");
                    // comprobar si ya está logueado
                    // si está loguedo, entonces añadir el usuario
                    // a la store "auth"
                    const isLogged = auth2.isSignedIn.get();
                    if (isLogged) {
                        const user = auth2.currentUser.get();
                        fetchUser!(user.getBasicProfile());
                    } else {
                        console.warn("no está logueado");
                        fetchUser!(null)
                    }
                    // añadir la instancia auth en la store "auth" 
                    // e incluir i18n en la store "app" 
                    // TODO: debería unificar ambas stores...
                    fetchAuth!(auth2)
                }, err => {
                    console.error("error al iniciar la app", err.details)
                    this.setState({error: {type: "init", msg: err.details}})
                })
            });
        }
        
        script.onload = () => {
            loaded();
        }
    }

    init() {
        const {appInitialized, i18n} = this.props;
        appInitialized!(i18n);
        this.loadGapi();
    }

    handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        this.props.i18n!.changeLanguage(e.currentTarget.value);
    }

    _renderInitAppError() {
        const {t}= this.props;
        return <h4>{t!("errorInitApp")}</h4>
    }

    _renderUnknownError() {
        const {t}= this.props;
        return <h4>{t!("errorDesconocido")}</h4>
    }

    _renderError(error: error) {
        if (error.type == "init") {
            // probablemente el client id sea incorrecto 
            // o el token no es válido
            return this._renderInitAppError();
        }
        return this._renderUnknownError();
    }

    _renderOK() {
        const {auth, t, history} = this.props;
        if (!auth!.auth)
            return <h4>{t!("cargando").toUpperCase()}</h4>
        return (
            <Switch>
                {(!auth || auth && !auth.user) && history.location.pathname != "/login" && 
                    <Redirect to="/login"/>
                }
                <LoginRoute path="/login" exact render={Login}/>
                <PrivateRoute exact path="/" render={Home}/>
            </Switch>
        )
    }

    render() {
        const {error} = this.state;
        // aqui es sencillo: 
        // si hay error, renderiza el error, 
        // si no pues renderiza la pantalla corresponediente,
        // (login en caso de no estarlo o directamente el home)
        const m = error 
            ? this._renderError(error) 
            : this._renderOK()
        return <Main>{m}</Main>
    }
}

const mapStateToProps = ({app, auth}) => {
    return {app, auth};
}
export default withRouter<any>(connect(mapStateToProps, actions)(withNamespaces('translation')(App)));
//export default withRouter<any>(connect(mapStateToProps, actions)(App));