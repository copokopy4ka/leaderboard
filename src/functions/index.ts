import { IUserITemType } from "../types/userTypes";

export const getRandomImg = (size: number) => {
    let randomId = Math.floor(Math.random() * (25 - 10) + 10);
    return `https://picsum.photos/id/1${randomId}/${size}/${size}`
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

export const findTopUsers = (allUsers: any[]) => {
    const result = [...allUsers
        .flat()
        .sort((a: any, b: any) => b.score - a.score)
        .reduce((result, user) => {
            
            if (result.length === 4) {
                return result
            } else {
                if(result.find((el: any) => el.name === user.name)) {
                    return result
                } else {
                    return [...result, user]
                }
            }
        }, [])
    ]

    return result
}

export const findPrevScore = (user: any, prevResults: any[]) => {
    const prevUser = prevResults.find((item: IUserITemType) => item.name === user.name);
    if (!prevUser) {
        return {
            color: 'rgb(247, 140, 0)',
            className: 'icon-caret-right',
            scoreDiff: ' ',
            text: 'No changes'
        }
    }
    if (prevUser.score < user.score) {
        return {
            color: 'rgb(121, 231, 58)',
            className: 'icon-caret-up',
            scoreDiff: `${user.score - prevUser.score} `,
            text: 'places'
        }
    } else if (prevUser.score > user.score) {
        return {
            color: 'rgb(255, 0, 0)',
            className: 'icon-caret-down',
            scoreDiff: `${prevUser.score - user.score} `,
            text: 'place'
        }
    } else {
        return {
            color: 'rgb(247, 140, 0)',
            className: 'icon-caret-right',
            scoreDiff: ' ',
            text: 'No changes'
        }
    }
}