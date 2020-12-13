import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCharacters, charactersSelector } from '../../../app/marvelSlice';

const Home = () => {
  const dispatch = useDispatch()		
  const { characters, loading, hasErrors } = useSelector(charactersSelector)

  useEffect(() => {
    dispatch(fetchCharacters())
  }, [dispatch])

  const renderCharacters = () => {
    if (loading) return <p>Loading characters...</p>
    if (hasErrors) return <p>Cannot display characters...</p>

    return characters.map(character =>
      <div key={character.id} className='tile'>
        <h2>{character.name}</h2>
        <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt=''/>
      </div>
    )
  }

  return (
    <section>
      <h1>Characters</h1>
      <div>
        {renderCharacters()}
      </div>
    </section>
  )
}

export default Home;
