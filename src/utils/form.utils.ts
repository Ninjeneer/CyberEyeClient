export const handleEnterKey = (event: React.KeyboardEvent, enterCallback: Function) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        enterCallback()
    }
}