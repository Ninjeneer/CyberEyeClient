import cx from "classnames"
import React from 'react'
import styles from './Style.module.css'
import Button from "../Button/Button"
import { FaCheck } from "react-icons/fa"

type PlanContainerProps = {
    name: string
    price: number
    best?: boolean
    children: React.ReactNode
    selected?: boolean
    onSelect: () => void
}
const PlanContainer = ({ name, price, best, children, onSelect, selected }: PlanContainerProps) => {
    return (
        <div className={cx(best ? "px-0 md:py-0" : "px-5 md:px-0 md:py-10")}>
            <div className={cx("flex flex-col justify-between rounded-md border p-2 w-full md:w-80 h-full bg-white gap-5", best && "border-primary shadow-2xl")}>
                <header className="flex flex-col items-center justify-center border-b py-6">
                    <h1 className="text-primary font-bold">{name}</h1>
                    <p className="text-3xl">{price} <span className="text-sm align-text-top">€ / mois</span></p>
                </header>

                <div className="p-2">
                    {children}
                </div>

                <div className="px-4 flex justify-center">
                    <Button type={selected ? 'success' : 'primary'} onClick={onSelect}>
                        {selected ? (
                            <span className="flex items-center gap-2"><FaCheck />Sélectionné</span>
                        ) : 'Sélectionner'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

type PlanSelectorProps = {
    onSelectPlan: (planId: string) => void
    selectedPlan?: string
}
const PlanSelector = ({ onSelectPlan, selectedPlan }: PlanSelectorProps) => {
    return (
        <div className="flex gap-2 flex-col md:flex-row">
            <PlanContainer name="Découverte" price={0} onSelect={() => onSelectPlan('free')} selected={selectedPlan === 'free'}>
                <ul>
                    <li className={styles.item}>10 crédits par mois</li>
                </ul>
            </PlanContainer>

            <PlanContainer name="Premium" price={4.99} best onSelect={() => onSelectPlan('premium')} selected={selectedPlan === 'premium'}>
                <ul>
                    <li className={styles.item}>100 crédits par mois</li>
                    <li className={styles.item}>Support en semaine</li>
                    <li className={styles.item}>Configuration personnalisée</li>
                    <li className={styles.item}>Export des rapports en PDF</li>
                </ul>
            </PlanContainer>

            <PlanContainer name="Entreprises" price={8.99} onSelect={() => onSelectPlan('enterprise')} selected={selectedPlan === 'enterprise'}>
                <ul>
                    <li className={styles.item}>1000 crédits par mois</li>
                    <li className={styles.item}>Support 7j/7</li>
                    <li className={styles.item}>Configuration personnalisée</li>
                    <li className={styles.item}>Export des rapports multi-formats</li>
                </ul>
            </PlanContainer>
        </div>
    )
}

export default PlanSelector