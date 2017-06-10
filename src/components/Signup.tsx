import * as React from 'react';

const classNames = require('classnames');

export default class Signup extends React.PureComponent<any, any> {
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
            // do submit
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
                                        <form className='form' onSubmit={this.submit}>
                                            <div className='field'>
                                                <p className='control'>
                                                    <input className='input' name='email' placeholder='Email'
                                                        value={this.state.email} autoFocus={true}
                                                        onChange={(e) => this.setState({email: e.target.value})} />
                                                </p>
                                            </div>
                                            <div className='field'>
                                                <p className='control'>
                                                    <input className='input' type='password' name='password'
                                                        placeholder='Password' value={this.state.password}
                                                        onChange={(e) => this.setState({password: e.target.value})} />
                                                </p>
                                            </div>
                                            <div className='field'>
                                                <p className='control'>
                                                    <button className={submitBtnClass}>Sign up</button>
                                                </p>
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
