import style from './Style.module.css'
import cx from 'classnames'

type Props = {
    children: React.ReactNode
    type: 'primary' | 'secondary' | 'warning' | 'danger' | 'success',
    onClick?: () => void
    disabled?: boolean
    size?: 'small' | 'base' | 'big'
}

const Button = ({ children, type, onClick, disabled, size = 'base' }: Props) => {
    return (
        <button
            onClick={onClick}
            className={cx(style[type], style.button, style[size], 'duration-200')}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button