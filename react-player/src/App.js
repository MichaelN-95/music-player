import { useState } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import './styles/app.scss';
import tracks from './util';

function App() {
	const [songs, setSongs] = useState(tracks());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);

	return (
		<div className='App'>
			<Song currentSong={currentSong} />
			<Player
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				currentSong={currentSong}
			/>
			<Library songs={songs} setCurrentSong={setCurrentSong} />
		</div>
	);
}

export default App;
