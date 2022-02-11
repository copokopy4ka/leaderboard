export const getRandomImg = () => {
    let randomId = Math.floor(Math.random() * (25 - 10) + 10);
    return `https://picsum.photos/id/1${randomId}/20/20`
}