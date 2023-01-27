export const getPostTime = (time) => {
    //console.log(time);
    const todaydate = new Date()
    const crdate = new Date(time)
    const elapsed = todaydate.getTime() - crdate.getTime();
    const timeInMin = Math.floor((elapsed / 1000) / 59)
    const timeInHours = Math.floor((elapsed / 1000) / 59 / 59)
    const timeInDays = Math.floor((((elapsed / 1000) / 59) / 59) / 24)

    const isCurrentMonth = crdate.getMonth() == todaydate.getMonth()

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthName = (arrNum) => {
        return months.find((e, index) => {
            return index == arrNum ? e : ""
        })
    }

    if (timeInMin < 1) {
        return "Just now"
    } else if (timeInMin >= 1 && timeInMin <= 59) {
        return `${timeInMin} m`;
    } else if (timeInMin > 59 && timeInHours < 24) {
        return `${timeInHours} h`;
    } else if (timeInHours >= 24 && timeInDays < 7) {
        return `${timeInDays} d`;
    } else if (timeInDays >= 7 && isCurrentMonth) {
        return `${monthName(crdate.getMonth())} ${crdate.getDate()} `;
    } else if (!isCurrentMonth) {
        return `${monthName(crdate.getMonth())} ${crdate.getDate()} ${crdate.getFullYear()}`;
    } else {
        return "date is not proper"
    }
}