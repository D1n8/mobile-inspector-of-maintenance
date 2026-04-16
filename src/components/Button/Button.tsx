import classNames from "classnames";
import './Button.scss'

type Button = {
    text: string,
    className: string
}

function Button({text, className}: Button) {
    return ( <button className={classNames('btn', className)}>{text}</button> );
}

export default Button;