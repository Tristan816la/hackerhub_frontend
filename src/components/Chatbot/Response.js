import React, { Fragment } from 'react';

const EmptyBlock = (props) => {
	return <Fragment>{Array.apply(null, { length: props.size }).map((e, i) => <br key={i} />)}</Fragment>;
};

const Response = () => {
	return (
		<Fragment>
			<div className="message message-left">Hi There! What can I do for you?</div>
			<EmptyBlock size={20} />
			<div className="message2 message-right">Some test here</div>
			<EmptyBlock size={1} />
		</Fragment>
	);
};

export default Response;
