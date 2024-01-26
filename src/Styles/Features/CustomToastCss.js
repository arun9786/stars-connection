import { StyleSheet } from "react-native";
export const Styles = StyleSheet.create({
    toastContainer: {
      position: 'absolute',
      right: 0,
      zIndex: 999,
      width: '100%',
    },
    toastContent: {
      padding: 15,
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'row',
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#e3e2e1',
    },
    textContainer: {
      flex: 1,
      marginLeft: 7,
      alignItems: 'center',
      justifyContent: 'center',
    },
    toastText: {
      fontFamily: 'sans-serif',
      color: 'black',
      fontSize: 19,
    },
    closeButton: {
  
    },
  });