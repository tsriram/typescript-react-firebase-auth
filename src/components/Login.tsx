import * as React from 'react';
import { Link } from 'react-router-dom';
const classNames = require('classnames');

import { login, loginWithGoogle } from '../util/auth';

export default class Login extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: '',
            submittig: false,
            error: null
        }

        this.submit = this.submit.bind(this);
    }

    submit(e: React.SyntheticEvent<any>) {
        e.preventDefault();
        const { email, password } = this.state;
        if(!(email && password)) {
            this.setState({
                error: 'Invalid email or password'
            });
        } else {
            this.setState({
                submitting: true
            });
            login(email, password)
                .catch((e) => {
                    this.setState({
                        submitting: false,
                        error: e.message
                    });
                })
        }
    }

    render() {
        const submitBtnClass = classNames({
            'button': true,
            'is-primary': true,
            'is-loading': this.state.submitting
        });
        return (
            <div className='container has-text-centered'>
                    <div className='columns'>
                        <div className='column is-half is-offset-one-quarter'>
                            <div className='box'>
                                <h2 className='title is-2 has-text-centered'>Login</h2>
                                <form className='form' onSubmit={this.submit}>
                                    {
                                        this.state.error &&
                                            <p className='notification is-danger'>
                                                {this.state.error}
                                            </p>
                                    }
                                    <div className='field'>
                                        <p className='control'>
                                            <input className='input' name='email' placeholder='Email'
                                                value={this.state.email} autoFocus={true} required
                                                onChange={(e) => this.setState({email: e.target.value})} />
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <p className='control'>
                                            <input className='input' type='password' name='password'
                                                placeholder='Password' value={this.state.password} required
                                                onChange={(e) => this.setState({password: e.target.value})} />
                                        </p>
                                    </div>
                                    <div className='field'>
                                        <div className='level'>
                                            <div className='level-left'>
                                                <div className='level-item'>
                                                    <p className='control'>
                                                        <button className={submitBtnClass}>Login</button>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='level-right'>
                                                <div className='level-item'>
                                                    <p className='control'>
                                                        <Link to='/signup' className='button is-outlined'>Sign up</Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div>
                                    <button className='button is-info is-outlined' onClick={() => loginWithGoogle()}>
                                        Log in with Google
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
