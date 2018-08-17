//This function accepts an array of double-item arrays
//The first item in each inner array will be mapped to its second item with
//this format: i.e. ["animal", "dog"] = "animal=dog"
//When more than one argument is provided each pair will be seperated with an
//ampersand (&): "animal=dog&breed=beagle&size=M" 
export const urlArgumentBuilder = (arr) => {
    // console.log('this is the array in urlArgument Builder');
    // console.log(arr);
    var toReturn = `${arr[0][0] + "=" + arr[0][1]}`;
    for (i = 1; i < arr.length; i++) {
        toReturn = toReturn.concat(`${"&" + arr[i][0] + "=" + arr[i][1]}`)
    }
    return toReturn;
}
