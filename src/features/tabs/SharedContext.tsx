import { createContext,FC, ReactNode, useContext } from "react";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

interface SharedStateContextType{
    scrollY:Animated.SharedValue<number>;
    scrollYGlobel : Animated.SharedValue<number>;
    scrollToTop:() => void
}

const SharedStateContext = createContext<SharedStateContextType | undefined >(undefined)

export const  SharedStateProvider:FC<{children:ReactNode}>=({children}) =>{
    const scrollY = useSharedValue(0)
    const scrollYGlobel = useSharedValue(0)
    const scrollToTop =()=>{
        scrollY.value = withTiming(0,{duration:300})
        scrollYGlobel.value = withTiming(0,{duration:300})
    }

    return(
        <SharedStateContext.Provider value={{ scrollToTop, scrollY, scrollYGlobel}}>
            {children}
        </SharedStateContext.Provider>
    )
}

export const useShareState=()=>{
    const context = useContext(SharedStateContext)
    if(context===undefined){
        throw new Error('useShareState must be used within a SharedStateProvider')
    }

    return context;
}