export default function uuid() {
    var t = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",
        a = t.length,
        n = "";
    for (let i = 0; i < 10; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n
}