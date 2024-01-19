const passwordEncoder=(password)=>{
    const shuffledArray = [
        '7', 'U', '#', 'J', 'z', 'g', 'a', 'X', '1', 'v','8', '@', '3', 'r', 'Q', 'o', '4', 'I', 'c', 'x','y', 't', 'Z', 'b', '2', 'd', 'h', '5', 'P', 'S','O', '6', 'F', 'n', 'V', 'l', 'w', '%', '9', 'm','e', 'Y', 'j', 'i', 'q', 'N', 'H', 'G', '0', 'K','D', '&', 'L', 'p', 'u', 'E', '^', 'k', 's', 'M','f', 'A', 'B', 'C', 'W', 'R', '!', 'T', '(', ')','x', 'V', 'b', 'H', 'k', 'g', 'F', '2', '7', 'Z','y', '9', '1', 'P', 'L', 'N', 'E', '#', 'Q', 'j','X', 'a', 'r', 'u', '0', 'c', 'O', '3', '5', 'q',
        '8', 'D', '4', 'W', 'Y', '6', 's', 'K', '!', 'm','&', 'G', 'T', 'l', '8', 'D', '4', 'W', 'Y', '6', 's', 'K', '!', 'm','&', 'G', 'T', 'l', 'v', 'I', 'z', 'R', 'C', 'n','d', 'J', 'o', '!', '3', 'K', 'U', 'X', 'v', '8','j', 'S', 'P', 'e', 't', '1', 'h', 'L', 'c', '2','r', 'A', 'x', '5', 'Q', '6', 'w', 'u', '9', 'g','f', 'm', 'D', '0', 'Z', 'y', '4', '7', 'i', 'B','V', 'q', 'b', 's', 'I', 'C', 'W', 'z', 'O', 'M','Y', 'L', 'X', 'k', 'p', 'G', 'n', 'H', 'a', 't','S', 'F', 'o', '3', 'E', '2', 'c', '1', 'x', '9','^', 'N', '6', '4', 'u', '7', '5', '(', '!', 'j', 'v', 'I', 'z', 'R', 'C', 'n','d', 'J', 'o', '!', '3', 'K', 'U', 'X', 'v', '8','j', 'S', 'P', 'e', 't', '1', 'h', 'L', 'c', '2','r', 'A', 'x', '5', 'Q', '6', 'w', 'u', '9', 'g','f', 'm', 'D', '0', 'Z', 'y', '4', '7', 'i', 'B','V', 'q', 'b', 's', 'I', 'C', 'W', 'z', 'O', 'M','Y', 'L', 'X', 'k', 
        'p', 'G', 'n', 'H', 'a', 't','S', 'F', 'o', '3', 'E', '2', 'c', '1', 'x', '9','^', 'N', '6', '4', 'u', '7', '5', '(', '!', 'j',

    ]; 
    let encodedPassword='';
    let length=password.length;
    for (let i = 0; i < length; i++) {
        const asciiValue = password.charCodeAt(i);
        encodedPassword += shuffledArray[asciiValue+(length-i-1)]+"";
    }
    return encodedPassword.trim(); 
}


export {passwordEncoder};