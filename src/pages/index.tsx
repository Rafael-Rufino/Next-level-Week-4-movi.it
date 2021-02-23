import {ExperienceBar} from "../components/ExperienceBar";
import {Countdown} from "../components/Countdown";
import {CompletedChallenges} from "../components/CompletedChallenges";
import {Profile} from "../components/Profile";

import styles from '../styles/pages/home.module.css'
import Head from  'next/head';
import React from "react";

export default function Home() {
  return (
    <div className = {styles.container}>
      {/* titulo da aplicaçao */}
     <Head>
        <title> Inicio | move.it</title>
      </Head> 
    <ExperienceBar/>

    <section>
      <div>
        <Profile/>
        <CompletedChallenges/>
        <Countdown/>
      

      </div>

        <div>

      </div>
    </section>
    </div>
    )
}
