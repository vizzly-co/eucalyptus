import React, { useEffect } from 'react';
import type { NextPage } from 'next'
import { User } from "../src/models/User";
import Link from 'next/link';

const Home: NextPage = () => {
  const [user, setUser] = React.useState<User| null>(null);

  useEffect(() => {
    const doFetchUser = async() => {
      const resp = await fetch("/api/self")

      if(resp.ok) {
        const body = await resp.json();
        body && setUser(body.user);
      };
    };

    doFetchUser();
  }, []);

  const signUp = async () => {
    const resp = await fetch("/api/sign-up")

    if(resp.ok) {
      const body = await resp.json();
      body && setUser(body.user);
    };
  }

  return (
    <>
      <header style={{background: "#174082", position: "relative", width: "100%", height: "50px"}} />
      <button onClick={() => {
        signUp();
      }}>Start a new user session</button>
      {user && (
        <Link href="/dashboard">
          <button>Continue as {user.id} for {user.organisationId}</button>
        </Link>
      )}
    </>
  )
}

export default Home
