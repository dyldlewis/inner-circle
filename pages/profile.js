'use client'
import React, { useState, useEffect } from "react"


const Profile = () => {

  const [user, setUser] = useState({})

  useEffect(() => {
    async function getProfile() {

      const jwt = localStorage.getItem('jwt');
      const formattedJwt = `Bearer ${jwt}`
      let result = await fetch(
        'http://localhost:3001/profile', {
        method: "get",
        headers: {
          'Authorization': formattedJwt,
        }
      }
      )
      result = await result.json();
      if (result) {
        setUser(result)
      }
    }
    getProfile()
  }, [])




  return (
    <div>Hello {user.username}</div>
  )
}

export default Profile
