"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { auth } from "./firebase"
import { onAuthStateChanged, User } from "firebase/auth"

interface FirebaseContextType {
  user: User | null
  userLoading: boolean
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  userLoading: true,
})

export const useFirebase = () => useContext(FirebaseContext)

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userLoading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <FirebaseContext.Provider value={{ user, userLoading }}>
      {children}
    </FirebaseContext.Provider>
  )
}
