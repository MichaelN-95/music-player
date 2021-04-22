const LibrarySong = ({ song, setCurrentSong, songs, id, key }) => {
	const songSelectHandler = () => {
		setCurrentSong(song);
	};

	//adding active state
	const newSongs = songs.map((song) => {
		if (song.id === id) {
			return {
				...song,
				active: true,
			};
		} else {
			return {
				...song,
				active: false,
			};
		}
	});
	return (
		<div
			onClick={songSelectHandler}
			className={`library-song ${
				song.id === currentSong.id ? 'selected' : ''
			} `}>
			<img src={song.cover} alt='Song cover' />
			<div className='song-description'>
				<h3>{song.name}</h3>
				<h4>{song.artist}</h4>
			</div>
		</div>
	);
};

export default LibrarySong;
