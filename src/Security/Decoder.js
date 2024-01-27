const phoneDecoderForReferal =(referalCode)=>{
    const shuffledArray = [
        'A', '7', 'j', '3', 'D', 'N', 'X', 'W', 'z', 'h',
        'B', 'a', 'k', 'w', '5', 'R', '9', 'p', 'U', 'l',
    ]
    let phone='';
    for( let i=0;i<10;i++){
        let number=referalCode[i];
        if(i%2==0){
            phone+=shuffledArray.indexOf(number);
        }
        else{
            phone+=(19-shuffledArray.lastIndexOf(number));
        }
    }
    return phone;
}

export {phoneDecoderForReferal};