type Props = {
	pageTitle: string
	children: React.ReactNode
	footer?: React.ReactNode
}

const Page = ({ pageTitle, children, footer }: Props) => {

	return (
		<section>
			<header className="p-4 bg-white mb-10">
				<h1 className="text-3xl">{pageTitle}</h1>
			</header>

			<div className="bg-white shadow w-4/5 m-auto">
				<div className="md:p-4">
					{children}
				</div>

				{footer ? (
					<footer className="border-t-2 mt-8 p-2 flex items-center">
						{footer}
					</footer>
				) : null}
			</div>
		</section>
	)
}

export default Page