import cx from 'classnames'
import Card from '../Card/Card'
import EmptyPage from './EmptyPage'

type Props = {
	pageTitle: string
	children: React.ReactNode
	footer?: React.ReactNode
	canGoPrevious?: boolean
	additionalStyle?: string
}

const Page = ({ pageTitle, children, footer, canGoPrevious, additionalStyle }: Props) => {

	return (
		<EmptyPage pageTitle={pageTitle} canGoPrevious={canGoPrevious}>
			<Card className="md:w-4/5 m-auto">
				<div className={cx("p-4", additionalStyle)}>
					{children}
				</div>

				{footer ? (
					<footer className="border-t-2 mt-8 p-2 flex items-center">
						{footer}
					</footer>
				) : null}
			</Card>
		</EmptyPage>

	)
}

export default Page