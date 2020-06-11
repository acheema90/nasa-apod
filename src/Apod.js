import React, { useEffect, useReducer, useRef } from 'react';
import getApod from './apodService';

import './styles.css';

const getDate = () => new Date().toDateString();

const Apod = () => {
	const GET_DATA_SUCCEEDED = 'GET_DATA_SUCCEEDED';
	const GET_DATA_FAILED = 'GET_DATA_FAILED';
	const SET_WIDTH = 'SET_WIDTH';
	const SET_IMG_SRC = 'SET_IMG_SRC';
	const initialState = {
		imgWidth: 900,
		imgSrc: '',
		imgTitle: 'No title available',
		imgDesc: 'No Description Available',
		imgDate: getDate(),
		imgCopy: 'No copyright infomration available',
	};
	const apodReducer = (state, action) => {
		const { type, data } = action;
		switch (type) {
			case GET_DATA_SUCCEEDED:
				return {
					...state,
					imgSrc: data.url || '',
					imgSrcHD: data.hdurl || '',
					imgTitle: data.title || ' No title available',
					imgDesc: data.explanation || 'No Description Available',
					imgCopy: data.copyright || 'No copyright information available',
					imgDate: getDate(),
				};
			case SET_WIDTH:
				return {
					...state,
					imgWidth: data,
				};
			case SET_IMG_SRC:
				return {
					...state,
					imgSrc: data,
				};
			case GET_DATA_FAILED:
			default:
				return state;
		}
	};

	const [state, dispatch] = useReducer(apodReducer, initialState);
	const apod = useRef(null);
	// set dynamic image width
	const setWidth = (e) => {
		// change width on input
		dispatch({ type: SET_WIDTH, data: e.target.value });
	};

	// make the apod request and set state
	useEffect(() => {
		const init = async () => {
			const res = await getApod();
			if (res) {
				dispatch({
					type: GET_DATA_SUCCEEDED,
					data: res,
				});
			} else {
				dispatch({
					type: GET_DATA_FAILED,
				});
			}
		};
		init();
	}, []);

	useEffect(() => {
		// if width more than 1000px use hdurl as src
		if (state.imgWidth >= 1000) {
			dispatch({ type: SET_IMG_SRC, data: state.imgSrcHD });
		}
		if (apod.current) {
			apod.current.style.width = `${state.imgWidth}px`;
		}
	}, [state.imgWidth, state.imgSrcHD, apod]);

	return (
		<div>
			<h1>Astronomy Picture of the Day ({state.imgDate})</h1>
			<img ref={apod} src={state.imgSrc} alt={state.imgTitle} />
			<h2>
				<a href={state.imgSrc}>{state.imgTitle}</a>
			</h2>
			<small>&copy; {state.imgCopy}</small>
			<br />
			<span>
				<strong>Set Image Width:</strong>
				<input
					type="number"
					min="0"
					placeholder="enter a pixel value"
					defaultValue={state.imgWidth}
					onChange={(e) => setWidth(e)}
				/>
			</span>
			<p>
				<strong>Explanation:</strong> {state.imgDesc}
			</p>
		</div>
	);
};

export default Apod;
