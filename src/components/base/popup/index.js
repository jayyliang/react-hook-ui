import React, { useEffect } from 'react'
import './index.less'
function Popup(props) {
    useEffect(() => {
        let popup = document.querySelector('.popup')
        popup.style.display = 'none'
    }, []);
    useEffect(() => {
        if (props.active) {
            let popup = document.querySelector('.popup')
            popup.style.display = ''
        }
        return () => {

        };
    }, [props.active]);

    return (
        <div onClick={(e) => clickMask(e, props)} className={`popup ${props.active ? 'fade-in' : 'fade-out'}`}>
            <div className="children">{props.children}</div>
        </div>
    )

    function clickMask(e, props) {
        e.persist()
        if (e.target.className.includes('popup')) {
            if (props.active) {
                setTimeout(() => {
                    e.target.style.display = 'none'
                }, 500);
            }
            props.closePopup()
        } else {
            console.log('nnn')
        }
    }
}

export default React.memo(Popup)