export const availablePeriodicities = [
    { cron: 'ONCE', label: 'Une fois' },
    { cron: '0 * * * *', label: 'Toutes les heures' },
    { cron: '0 0 * * *', label: 'Tous les jours' },
    { cron: '0 0 * * 0', label: 'Toutes les semaines' },
    { cron: '0 0 1 * *', label: 'Tous les mois' },
    { cron: '0 0 1 1 *', label: 'Tous les ans' },
];

export const getPeriodicityLabelByValue = (value: string) => {
    return availablePeriodicities.find((periodicity) => periodicity.cron === value)?.label
}