export default {
	palette: {
		primary: {
			light: '#4e4e4e',
			main: '#222222',
			dark: '#171717',
			contrastText: '#fff'
		},
		secondary: {
			light: '#e39cb3',
			main: '#dd84a1',
			dark: '9a5c70',
			contrastText: '#000'
		}
	},
	pageStyles: {
		form: {
			textAlign: 'center'
		},
		image: {
			margin: '20px auto 20px auto',
			maxWidth: '9vw'
		},
		button: {
			marginTop: '20px',
			position: 'relative'
		},
		progress: {
			position: 'absolute'
		},
		pageTitle: {
			margin: '10px auto 10px auto'
		},
		textField: {
			margin: '10px auto 10px auto '
		},
		generalError: {
			color: 'red',
			fontSize: '1vw',
			marginTop: '10px'
		},
		invisibleSeparator: {
			border: 'none',
			margin: 4
		},
		visibleSeparator: {
			width: '100%',
			borderBottom: '1px solid rgba(0,0,0,0.1)',
			marginBottom: 20
		},
		paper: {
			padding: 20
		},
		profile: {
			'& .image-wrapper': {
				textAlign: 'center',
				position: 'relative',
				'& button': {
					position: 'absolute',
					top: '80%',
					left: '70%'
				}
			},
			'& .profile-image': {
				width: 200,
				height: 200,
				objectFit: 'cover',
				maxWidth: '100%',
				borderRadius: '50%'
			},
			'& .profile-details': {
				textAlign: 'center',
				'& span, svg': {
					verticalAlign: 'middle'
				},
				'& a': {
					color: '#4e4e4e'
				}
			},
			'& hr': {
				border: 'none',
				margin: '0 0 10px 0'
			},
			'& svg.button': {
				'&:hover': {
					cursor: 'pointer'
				}
			}
		},
		buttons: {
			textAlign: 'center',
			'& a': {
				margin: '20px 10px'
			}
		},
		card: {
			display: 'flex',
			background: 'rgb(253, 253, 253)',
			marginBottom: 20,
			position: 'relative'
		},
		content: {
			padding: 25
		},
		image: {
			maxWidth: 200,
			objectFit: 'cover'
		},
		postImage: {
			minWidth: 200,
			objectFit: 'cover'
		}
	}
};
