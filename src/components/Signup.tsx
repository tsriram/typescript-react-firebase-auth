import * as React from 'react';
import { Link } from 'react-router-dom';

import * as auth from '../util/auth';
const classNames = require('classnames');

export default class Signup extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            submittig: false,
            error: null,
            message: null
        }

        this.submit = this.submit.bind(this);
    }

    submit(e: React.SyntheticEvent<any>) {
        e.preventDefault();
        const { firstName, lastName, email, password } = this.state;
        if(!(firstName && lastName && email && password)) {
            this.setState({
                error: 'Invalid email or password'
            });
        } else {
            this.setState({
                submitting: true
            });
            auth.createUser(firstName, lastName, email, password)
                .then((resp) => {
                    this.setState({
                        submitting: false,
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        message: 'User registered successfully'
                    });
                })
                .catch((error) => {
                    this.setState({
                        submitting: false,
                        error: error.message || 'Error while signing up'
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
            <div className='hero is-fullheight'>
                <div className='hero-body'>
                    <div className='container has-text-centered'>
                        <div className='container'>
                            <div className='columns'>
                                <div className='column is-half is-offset-one-quarter'>
                                    <div className='box'>
                                        <h2 className='title is-2 has-text-centered'>Sign up</h2>
                                        {
                                            this.state.error &&
                                                <p className='notification is-danger'>{this.state.error}</p>
                                        }
                                        {
                                            this.state.message &&
                                                <p className='notification is-success'>{this.state.message}</p>
                                        }
                                        <form className='form' onSubmit={this.submit}>
                                            <div className='field'>
                                                <p className='control'>
                                                    <input className='input' name='firstName' placeholder='First name'
                                                        value={this.state.firstName} autoFocus={true} required
                                                        onChange={(e) => this.setState({firstName: e.target.value})} />
                                                </p>
                                            </div>
                                            <div className='field'>
                                                <p className='control'>
                                                    <input className='input' name='lastName' placeholder='Last name'
                                                        value={this.state.lastName} required
                                                        onChange={(e) => this.setState({lastName: e.target.value})} />
                                                </p>
                                            </div>
                                            <div className='field'>
                                                <p className='control'>
                                                    <input className='input' name='email' placeholder='Email'
                                                        value={this.state.email} required
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
                                                                <button className={submitBtnClass}>Sign up</button>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='level-right'>
                                                        <div className='level-item'>
                                                            <p className='control'>
                                                                <Link to='/login' className='button is-outlined'>Login</Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
