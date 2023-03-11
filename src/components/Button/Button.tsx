import style from './Style.module.css'
import cx from 'classnames'

type Props = {
    text: string
    type: 'primary' | 'secondary',
    onClick?: () => void
    disabled?: boolean
}

const Button = ({ text, type, onClick, disabled }: Props) => {
    return (
        <button
            onClick={onClick}
            className={cx(style[type], style.button)}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button