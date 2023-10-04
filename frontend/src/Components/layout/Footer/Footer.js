/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export class Footer extends React.Component {
	render() {
		return (
			<>
				<footer className="text-center text-lg-start bg-dark text-light">
					<section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
						<div className="me-5 d-none d-lg-block">
							<span>Get connected with us on social networks:</span>
						</div>

						<div>
							<a
								target="blank"
								href="https://www.facebook.com/aniketkrgupta.gupta?mibextid=ZbWKwL"
								className="me-4 text-reset"
							>
								<i
									style={{ color: '#0b84ee' }}
									className="fab fa-facebook-f"
								></i>
							</a>

							<a
								target="blank"
								href="https://instagram.com/aniket.g002?igshid=ZDc4ODBmNjlmNQ=="
								className="me-4 text-reset"
							>
								<i className="fab fa-instagram"></i>
							</a>
							<a
								target="blank"
								href="https://www.linkedin.com/in/aniket-gupta-5b108a250/"
								className="me-4 text-reset"
							>
								<i
									style={{ color: '#0077b5' }}
									className="fab fa-linkedin"
								></i>
							</a>
							<a
								target="blank"
								href="https://github.com/anii002"
								className="me-4 text-reset"
							>
								<i
									style={{
										color: '#171515',
										backgroundColor: 'white',
										borderRadius: 10,
									}}
									className="fab fa-github"
								></i>
							</a>
						</div>
					</section>
					<div
						className="text-center p-3"
						style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
					>
						© 2023 Copyright:
						<a className="text-reset"> Nosh-Box</a>
					</div>
				</footer>
			</>
		);
	}
}

export default Footer;
