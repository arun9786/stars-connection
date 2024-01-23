import NetInfo from "@react-native-community/netinfo";

export const checkInternetConnection=async()=> {
    return new Promise((resolve, reject) => {
        NetInfo.addEventListener(state => {
            if (state.isConnected) {
                // console.log("connected");
                resolve(true);
            } else {
                // console.log("not connected");
                reject(false);
            }
        });
    });
}
