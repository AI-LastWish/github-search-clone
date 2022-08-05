import { FAVORITE } from "../constants/FavoriteConst"
import { getUserDetails } from "../services/searchServices"
import { UserDetails, UserDetailsType } from "../typings"

export const fetchFavorite = async (setFavorite: React.Dispatch<React.SetStateAction<UserDetails[]>>) => {
  const temp: UserDetails[] = []
  const favoriteFromStorage = localStorage.getItem(FAVORITE)
  if (favoriteFromStorage) {
    const favoriteJSON: string[] = JSON.parse(favoriteFromStorage)
    await Promise.all(favoriteJSON.map(async f => {
      const data = await getUserDetails(f, UserDetailsType.UserDetails)
      temp.push(data as UserDetails)
    }))
    setFavorite(temp)
  }
}