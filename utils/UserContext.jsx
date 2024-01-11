import { createContext, useEffect, useState, } from "react"
import { getUser } from "./api"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [completeQuests, setCompleteQuests] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
           await getUser().then((res) => {
            setUser(res)
           })
        }
        fetchUser()
        console.log(user)
    }, [])
    return(
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
// Need to keep track of state here? to update when a quest completes, triggering a rerender?