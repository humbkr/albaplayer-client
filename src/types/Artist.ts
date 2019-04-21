// eslint-disable-next-line import/no-cycle
import Album from './Album'

export default interface Artist {
  id: string
  name: string
  albums?: Array<Album>
  dateAdded?: number
}
