import { useMemo, useState } from "react"
import { ProbeResult } from "../../../models/report"
import { NmapService, ProbeNmapResult } from "../../../models/results/probeNmapResult"
import ProbeResultContainer from "../ProbeResult/ProbeResult"
import Table from "../../Table/Table"
import Button from "../../Button/Button"

const buildServiceName = (service: NmapService): string => {
	return `${service.product || ''} ${service.version || ''} ${service.version ? '(' + service.version + ')' : ''}`
}

type RowCVEProps = {
	cves: NmapService['cves']
}
const RowCVE = ({ cves }: RowCVEProps) => {
	const sortedCVEs = useMemo(() => (structuredClone(cves) as RowCVEProps['cves']).sort((a, b) => b.id.localeCompare(a.id)), [cves])

	return (
		<div className="flex flex-col flex-1 gap-2 p-2">
			{sortedCVEs?.map((cve) => (
				<div key={cve.id}>
					<label>{cve.id}</label>
					{cve.descriptions
						?.filter((description) => description.lang === 'en')
						.map((description, i) => <p className="ml-4 text-sm" key={i}>{description.value}</p>)
					}
				</div>
			))}
		</div>
	)
}

type Props = {
	result: ProbeResult<ProbeNmapResult>
}
const ProbeNmapResult = ({ result }: Props) => {
	const tableData = useMemo(() => {
		const services = result.result

		return services.map((service) => ({
			...service,
			name: buildServiceName(service),
		})).sort((a, b) => b.cves.length - a.cves.length)
	}, [result])

	return (
		<ProbeResultContainer result={result}>

			<Table
				columns={[

					{
						Header: 'Port',
						accessor: 'port'
					},
					{
						Header: 'Service',
						accessor: 'name'
					},
					{
						// Make an expander cell
						Header: 'Vulnérabilité', // No header
						id: 'expander', // It needs an ID
						Cell: ({ row }) => {
							const service: NmapService = row.original
							const cves = service.cves
							return cves?.length > 0 ? (
								<span {...row.getToggleRowExpandedProps()} title="">
									<Button type="secondary" size="small">
										{row.isExpanded ? 'Fermer' : `Voir (${cves.length})`}
									</Button>
								</span>
							) : <p>{ service.version ? 'Aucune' : 'Impossible de récupérer la version du service' }</p>
						}
					},
				]}
				data={tableData}
				renderRowSubComponent={(row) => <RowCVE cves={row.row.original.cves} />}
			/>
		</ProbeResultContainer>
	)
}

export default ProbeNmapResult