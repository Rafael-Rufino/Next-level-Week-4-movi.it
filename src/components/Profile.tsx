import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';
export function Profile(){
    const {level} = useContext(ChallengesContext);
    return (
        <div className = {styles.profileContainer}>
            <img src = "https://avatars.githubusercontent.com/u/45695326?s=460&u=8b2a3551c2b0874d67a20ae43a0100b54d5098fb&v=4" alt = "Rafael Rufino"/>

            <div>
                <strong> Rafael Rufino </strong>
                <p>
                    <img src = "icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
     
        
    );
}