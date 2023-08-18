import { LinearGradient } from 'expo-linear-gradient'; 
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';



const BG = styled(LinearGradient).attrs({
  colors: ['#319795', '#4FD1C5'],

})`
  flex: 1;
`;



export default function Background({ children }) {
  return <BG>
    <SafeAreaView>
       {children}
    </SafeAreaView>
   
  </BG>
}