import React from 'react'
import classes from './Input.module.css'

const input = (props) => {
	let inputElement = null
	const inputClasses = [classes.InputElement]

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid)
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
			break
		case 'textarea':
			inputElement = (
				<textarea

					className={inputClasses.join(' ')+' '+classes.TextArea}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
			break
		default:
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
	}

	let validationMessage = props.label[0].toUpperCase()+props.label.slice(1)
	if (props.invalid && props.touched) {
		validationMessage = `Please enter a valid ${props.label}`

	}

	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{validationMessage}
			{inputElement}
			</label>
		</div>
	)
}

export default input
