export const getUSDate = (date: Date) => {
    const dateOpts: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const timeOpts: Intl.DateTimeFormatOptions = {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };
    return `${date.toLocaleDateString('en-US', dateOpts)} ${date.toLocaleTimeString('en-US', timeOpts)}`;
};
