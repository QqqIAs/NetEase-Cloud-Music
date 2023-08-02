const getArtistsName = (artists: any[]) => {
  let str = ''
  if(artists?.length > 0) {
    artists.forEach((item, index) => {
      if(index !== 0)
      str+=`/ ${item.name}`
      else str+=item.name
    })
  }
  return str
}

export default getArtistsName