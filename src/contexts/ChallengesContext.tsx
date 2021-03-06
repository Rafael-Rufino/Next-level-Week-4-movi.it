import {createContext, useState, ReactNode, useEffect} from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';
import {LevelUpModal} from  '../components/LevelUpModal';


interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;

}

interface ChallengesContextData{
    level: number;
    currentExperience: number; 
    challengesCompleted: number;
    experienceToNextLevel: number;
    
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: ()=> void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;


}
interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}
export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
  const [level, setLevel] = useState(rest.level)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted)
  

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpNodalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    //notificação
    useEffect(() =>{
        Notification.requestPermission(); //APi do proprio browser
    }, [])

    useEffect(() =>{
        Cookies.set('level',String(level));
        Cookies.set('currentExperience',String(currentExperience));
        Cookies.set('challengesCompleted',String(challengesCompleted));

    },[level, currentExperience, challengesCompleted]);

    function levelUp(){
    setLevel(level + 1);
    setIsLevelUpNodalOpen(true)

    }
    function closeLevelUpModal(){
        setIsLevelUpNodalOpen(false);
    }



    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)
        new Audio('/notification.mp3').play();//APi padrao pra tocar audio

        if(Notification.permission === "granted"){
            new Notification('Novo desafio 🏃‍♀️',{
                body: `Valendo ${challenge.amount}xp!`

                
             } )
        }
      
    }
    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChallenge(){
        console.log('entrou!')
        if(!activeChallenge){
            return;
        }
        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    return(
        <ChallengesContext.Provider
         value={{
            level,
            currentExperience, 
            challengesCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
            experienceToNextLevel,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal,
            
            
        }}
            >
            {children}

        {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>
    );
}
