import NetInfo from "@react-native-community/netinfo";

export async function checkInternetConnection() {
    NetInfo.fetch().then(state => {
        if(state.isConnected){
            console.log("connected");
            return true;
        }else{
            console.log("not connected");
            return false;
        }
    });

    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
    });
    
    // Unsubscribe
    unsubscribe();
}
