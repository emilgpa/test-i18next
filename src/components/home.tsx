/// <reference types="gapi.auth2" />

import * as React from "react"
import * as ReactDOM from "react-dom"
import {connect} from 'react-redux';
import styled from 'styled-components'
import { withNamespaces, TransProps } from 'react-i18next';
import { withRouter, RouteComponentProps } from "react-router-dom";

import * as actions from '../store/actions/index';
import {IUserStore, IAuthStore, IAppStore} from '../store/types';

type error = {type: string, msg: string}

interface IState {
    error: error | null
}

const Header = styled.header`
    display: flex;
    align-items: center;
    color: #FFF;
    padding-bottom: 12px;
    border-bottom: 1px solid #404040;

    position: fixed;
    width: calc(100% - 30px);
    background-color: #1f1f1f;
    margin-top: -15px;
    padding-top: 15px;

`

const UserInfo = styled.header`
    display: flex;
    flex-wrap: wrap;
`

const Username = styled.span`
    margin: 0 5px 0 2px;
    font-weight: bold;
`

const Email = styled.span`
    color: #9a9a9a;
`

const Logout = styled.a`
    text-decoration: none;
    font-weight: lighter;
    color: #757575;
    margin-left: auto;
`

const UserImage = styled.img`
    height: 40px;
    margin-right: 5px;
`

const Content = styled.main`
    margin-top: 66px;
`

const Select = styled.select`
    background-color: yellow;
    color: black;
`

type IProps = IUserStore & IAuthStore & IAppStore & TransProps & RouteComponentProps

class Home extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
        }
    }

    handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        await this.props.auth!.auth!.disconnect();
        this.props.fetchUser!(null)
    }

    handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const {changeLanguage} = this.props;
        const value = e.currentTarget.value;
        if (value != "es" && value != "en") {
            // TODO: manejar error mostrándolo en la UI
            console.warn("idioma no válido");
            alert("idioma no válido")
            return
        }
        changeLanguage!(value);
    }

    renderCargando() {
        const {t} = this.props;
        return <h4>{t!("cargando").toUpperCase()}</h4>
    }

    render() {
        const {auth, i18n, t} = this.props;
        // TODO: debería manejar un error aqui.
        //       Que no se haya incluido la instancia "auth" a la store
        //       no significa que no se haya producido un error.
        //       En caso de producirse, la pantalla se mostraría como "cargando..."
        //       cuando debería estar realmente mostrando el error
        if (!auth!.auth)
            return this.renderCargando()
        const {user} = auth!;
        console.warn("render home.tsx")
        return (
            <>
                <Header>
                    <UserImage src={user!.getImageUrl()} alt=""/> 
                    <UserInfo>
                        <Username>{user!.getName()}</Username> <Email>[{user!.getEmail()}]</Email>
                        <Select name="" id="" onChange={this.handleChangeLanguage} value={i18n!.language}>
                            <option value="es">ES</option>
                            <option value="en">EN</option>
                        </Select>
                    </UserInfo>
                        <Logout href="" onClick={this.handleLogout}>{t!("salir")}</Logout>
                </Header>
                <Content>
                    <h1>{t!("bienvenido")}</h1>
                    <p>{t!("texto")}</p>
                </Content>
            </> 
        )
    }
}

const mapStateToProps = ({app, auth}) => {
    return {app, auth};
}
export default withRouter<any>(connect(mapStateToProps, actions)(withNamespaces('translation')(Home)));