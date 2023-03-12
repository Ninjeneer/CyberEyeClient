import style from './Style.module.css'
import cx from 'classnames'

type Props = {
    text: string
    type: 'primary' | 'secondary',
    onClick?: () => void
    disabled?: boolean
    size?: 'small' | 'base' | 'big'
}

const Button = ({ text, type, onClick, disabled, size = 'base' }: Props) => {
    return (
        <button
            onClick={onClick}
            className={cx(style[type], style.button, style[size])}
            disabled={disabled}
        >
            {text}
        </button>
    )
}

export default Button