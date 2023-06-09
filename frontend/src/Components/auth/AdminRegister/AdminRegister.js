import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerAdmin } from '../../action/Adminauthactions';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
export class AdminRegister extends React.Component {
	constructor() {
		super();
		this.state = {
			restorentname: '',
			email: '',
			password: '',
			errors: {},
		};
		document.title = `AdminSignUp`;
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const newAdmin = {
			restorentname: this.state.restorentname,
			email: this.state.email,
			password: this.state.password,
		};
		console.log(newAdmin)
		this.props.registerAdmin(newAdmin, this.props.history);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	render() {
		const { errors } = this.state;
		return (
			<div>
				<div className="Adminregister">
					<div className="container">
						<div className="row ">
							<div className="col-md-6 m-auto shadow-lg p-3 mb-5 bg-white rounded mt-4 ">
								<h1 className="display-4 text-center mb-5">Admin Sign Up</h1>
								<form onSubmit={this.onSubmit.bind(this)}>
									<div className="form-group m-0">
										<input
											onChange={this.onChange}
											type="text"
											className={classnames('form-control', {
												'is-invalid m-0': errors.restorentname,
											})}
											placeholder="RestorentName"
											name="restorentname"
											value={this.state.restorentname}
										/>
										{errors.restorentname && (
											<div className="invalid-feedback mb-2">
												{errors.restorentname}
											</div>
										)}
									</div>
									<div className="form-group">
										<input
											onChange={this.onChange}
											type="email"
											className={classnames('form-control', {
												'is-invalid m-0': errors.email,
											})}
											placeholder="Email Address"
											name="email"
										/>
										{errors.restorentname && (
											<div className="invalid-feedback mb-2">
												{errors.email}
											</div>
										)}
									</div>
									<div className="form-group">
										<input
											onChange={this.onChange}
											type="password"
											className={classnames('form-control', {
												'is-invalid m-0': errors.password,
											})}
											placeholder="Password"
											name="password"
										/>
										{errors.restorentname && (
											<div className="invalid-feedback mb-2">
												{errors.password}
											</div>
										)}
									</div>
									<input
										type="submit"
										value="Next Step 1/2"
										className="btn btn-success  mt-2"
									/>
								</form>
								<div className="text-muted">
									Already have an account
									<Link
										to="/Adminlogin"
										className="text-primary text-decoration-none"
									>
										AdminLogin
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

AdminRegister.propTypes = {
	registerAdmin: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { registerAdmin})(withRouter(AdminRegister));
