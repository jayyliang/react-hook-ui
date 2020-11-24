export default function removeClass(classList, className) {
    //将className属性转为数组
    let classArr = classList.split(" "),
        index = classArr.indexOf(className);
    //将符合条件的class类删除
    index > -1 ? classArr.splice(index, 1) : null;
    return classArr.join(" ");
};