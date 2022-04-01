import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';

const URL = 'http://hn.algolia.com/api/v1/search';

function Search() {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);
  const [value, setValue] = useState('');

  const handleFetch = async () => {
    let result;

    try {
      result = await axios.get(`${URL}?query=${value}`);
      setStories(result.data.hits);
      console.log(value, 'value', result.data.hits[0]);
    } catch (errorEvent) {
      setError(errorEvent);
    }
  };

  return (
    <div>
      <h2>Cari Cerita</h2>
      <input onChange={(e) => setValue(e.target.value)} type="text" placeholder="Tulis Cerita" />
      <button type="button" onClick={handleFetch}>
        Cari Cerita
      </button>
      {' '}
      <br />

      {error && <span>Ada yang error ...</span>}

      {stories.length > 0 && 'Daftar Cerita'}
      <ul>
        {stories.map((story) => (
          <li key={story.objectID}>
            {story.title}
            {' '}
            <button type="button" href={story.url}>Baca Selengkapnya</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
