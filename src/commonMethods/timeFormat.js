
// this method is used to convert the time (new Date(milliseconds)) into 12 hour format
export const timeFormat = (input) => {
    const timeToFormat = new Date(input)
    let getHour = timeToFormat.getHours()
    const getMin = timeToFormat.getMinutes()
    let finalMin
    let stamp
    if (getMin >= 0 && getMin < 10) {
        finalMin = '0' + getMin
    } else {
        finalMin = getMin
    }

    if (getHour > 12) {
        getHour = getHour - 12
        stamp = 'PM'
    } else if(getHour === 12) {
        stamp = 'PM'
    } else if (getHour === 0) {
        getHour = 12
        stamp = 'AM'
    } else {
        stamp = 'AM'
    }
    return {
        hour : getHour,
        minute : finalMin,
        stamp : stamp
    }
}