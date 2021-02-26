import {useContext} from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const {activeChallenge,resetChallenge, completeChallenge} = useContext(ChallengesContext);
    const {resetCountdown} = useContext(CountdownContext);
    
    function handleChallengeSucceeded(){
        completeChallenge();
        resetCountdown();

    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }



    return(

        <div className = {styles.ChallengeBoxContainer}>
            {activeChallenge ?(
                <div className = {styles.ChallengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src = {`icons/${activeChallenge.type}.svg`}  />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                         type = "button"
                         className = {styles.ChallengeFailedButton}
                         onClick = {handleChallengeFailed}
                         >
                            falhei
                        </button>
                        <button
                         type = "button"
                         className = {styles.ChallengeSucceededButton}
                         onClick = {handleChallengeSucceeded}
                         >
                            Completei
                        </button>
                    </footer>

                </div>
            ):(
                <div className = {styles.ChallengeNotActive}>
                <strong>Finalize um ciclo para receber um desafios</strong>
                <p>
                    <img src = "icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafio.
                </p>

            </div>

            )}
        

        </div>
    )
}