import Head from  'next/head';
import React from "react";
import {GetServerSideProps} from 'next';
import {ExperienceBar} from "../components/ExperienceBar";
import {Countdown} from "../components/Countdown";
import {CompletedChallenges} from "../components/CompletedChallenges";
import {Profile} from "../components/Profile";
import {ChallengeBox} from "../components/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import {CountdownProvider } from "../contexts/CountdownContext";
import {ChallengesProvider} from "../contexts/ChallengesContext";


interface HomeProps{
  level:number;
  currentExperience:number;
  challengesCompleted:number;
}


export default function Home(props: HomeProps) {
  console.log(props)
  return (
  <ChallengesProvider
  level = {props.level}
  currentExperience={props.currentExperience}
  challengesCompleted={props.challengesCompleted}
  >
    <div className = {styles.container}>
      {/* titulo da aplicaçao */}
     <Head>
        <title> Inicio | move.it</title>
      </Head> 
    <ExperienceBar/>
    <CountdownProvider>
      <section>
      <div>
        <Profile/>
        <CompletedChallenges/>
        <Countdown/>
      </div>
      <div>
      <ChallengeBox/>
      </div>
    </section>
    </CountdownProvider>

    </div>
      </ChallengesProvider>

    )
}


// dados que vao do next para o react
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level ?? 1),
      currentExperience: Number(currentExperience ?? 0),
      challengesCompleted: Number(challengesCompleted ?? 0)
    }
  }
}


//back-end (Ruby)
// NExt.js (Node.js)
//front-end (React)

