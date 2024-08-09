import React from 'react';
import '../Styles/header.css';
import GoogleLogin from 'react-google-login';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: '1px solid brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            loggedInUser: undefined
        }
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, loggedInUser: response.profileObj.name, loginModalIsOpen: false });
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, loggedInUser: undefined });
    }

    render() {
        const { loginModalIsOpen, loggedInUser, isLoggedIn } = this.state;
        return (
            <div>
                <div class="header">
                    <div class="header-logo">
                        <b>zc</b>
                    </div>
                    {!isLoggedIn ?
                        <div class="user-group">
                            <div class="login" onClick={() => this.handleModal('loginModalIsOpen', true)}>Login</div>
                            <div class="signup">Create an account</div>
                        </div>
                        : <div class="user-group">
                            <div class="login">{loggedInUser}</div>
                            <div class="signup" onClick={this.handleLogout}>Logout</div>
                        </div>}
                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                        <GoogleLogin
                            clientId="212008453545-48c1r0ue9lp231up315r94n9npj8rjpt.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <br />
                        <button class="btn btn-light">Continue with Credentials</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Header;