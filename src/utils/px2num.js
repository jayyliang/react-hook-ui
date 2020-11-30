export default function px2num(str) {
    let index = str.indexOf('p')
    return Number(str.slice(0, index))
}