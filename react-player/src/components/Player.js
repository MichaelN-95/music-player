import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faAngleLeft,
	faAngleRight,
	faPause,
} from '@fortawesome/free-solid-svg-icons';
import Song from './Song';

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
	const audioRef = useRef(null);
	const playSongHandler = () => {
		// console.log(audioRef.current);
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};
	const getTime = (time) => {
		return (
			Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
		);
	};

	//handlers
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime: current, duration });
	};

	const dragHandler = (e) => {
		audioRef.current.currentTime = e.target.value;
		setSongInfo({ ...songInfo, currentTime: e.target.value });
	};

	useEffect(() => {
		if (isPlaying && audioRef.current.paused) {
			audioRef.current.play();
		}
	}, [isPlaying, currentSong]);

	//state
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
	});
	return (
		<div className='player'>
			<div className='time-control'>
				<p>{getTime(songInfo.currentTime)}</p>
				<input
					min={0}
					max={songInfo.duration}
					value={songInfo.currentTime}
					onChange={dragHandler}
					type='range'
				/>
				<p>{getTime(songInfo.duration)}</p>
			</div>
			<div className='play-control'>
				<FontAwesomeIcon className='skip-back' icon={faAngleLeft} size='2x' />
				<FontAwesomeIcon
					onClick={playSongHandler}
					className='play'
					icon={isPlaying ? faPause : faPlay}
					size='2x'
				/>
				<FontAwesomeIcon
					className='skip-forward'
					icon={faAngleRight}
					size='2x'
				/>
			</div>
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}></audio>
		</div>
	);
};

export default Player;
