export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const getTime = (currentBlock, endBlock) => {

    var seconds = (endBlock - currentBlock) * 12;
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

export const formatID = (id, toDecimal) => {
    let res = id.toString();

    if (toDecimal) {
        let r = res.slice(0, 8) + res.charCodeAt(8);
        return r;
    } else {
        let aux = res.slice(8);
        let r = res.slice(0, 8) + String.fromCharCode(parseInt(aux));
        return r;
    }
}