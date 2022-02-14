export const getRandomImg = () => {
    let randomId = Math.floor(Math.random() * (25 - 10) + 10);
    return `https://picsum.photos/id/1${randomId}/20/20`
}

export const setUserPlace = (index: number) => {
    let userPlace: string = '';

    if (index + 1 === 1) {
        userPlace = `${index + 1}st`
    } else if (index + 1 === 2) {
        userPlace = `${index + 1}nd`
    } else if (index + 1 === 3) {
        userPlace = `${index + 1}rd`
    } else {
        userPlace = `${index + 1}th`
    }

    return userPlace;
}