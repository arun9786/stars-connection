import NetInfo from "@react-native-community/netinfo";

export const checkInternetConnection=async()=> {
    return new Promise((resolve, reject) => {
        const unsubscribe= NetInfo.addEventListener(state => {
            if (state.isConnected && state.isInternetReachable) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}
