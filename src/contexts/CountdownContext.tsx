
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinisted: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
    

}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)
let countdownTimeout: NodeJS.Timeout;
export function CountdownProvider({children}: CountdownProviderProps){
    const {startNewChallenge} = useContext(ChallengesContext);



    const [time, setTime] = useState(0.3 * 60);//minutos
    const [isActive, setIsActive] = useState(false);
    const [hasFinisted, setHasFinished] = useState(false);
  
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    function startCountdown() {
        setIsActive(true);
      }
      //parada
      function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(0.3 * 60);
      }
      // cronometro
      useEffect(() => {
        if (isActive && time > 0) {
          countdownTimeout = setTimeout(() => {
            setTime(time - 1);
          }, 1000);
        } else if (isActive && time === 0) {
          setHasFinished(true);
          setIsActive(false);
          startNewChallenge();
        }
      }, [isActive, time]);
   
    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinisted,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}