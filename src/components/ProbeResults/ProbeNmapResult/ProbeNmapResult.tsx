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
	return (
		<div className="flex flex-col flex-1 gap-2 p-2">
			{cves.map((cve) => (
				<div key={cve.id}>
					<label>{cve.id}</label>
					<p className="ml-4 text-sm">{cve.descriptions?.value}</p>
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
							const cves = row.original.cves
							return cves?.length > 0 ? (
								<span {...row.getToggleRowExpandedProps()} title="">
									<Button type="secondary" text={row.isExpanded ? 'Fermer' : `Voir (${cves.length})`} size="small" />
								</span>
							) : <p>Aucune</p>
						}
					},
				]}
				data={tableData}
				renderRowSubComponent={(row) => <RowCVE cves={row.row.original.cves} />}
			/>


			{/* <table className="w-full">
				<thead className="text-left">
					<tr>
						<th>Port</th>
						<th>Service</th>
						<th>Vulnérabilités (CVE)</th>
					</tr>
				</thead>
				<tbody>
					{
						result.result.map((service) => (
							<tr>
								<td>{service.port}</td>
								<td>{buildServiceName(service)}</td>
								<td>
									{ service.cves?.length > 0 ? <a>Voir</a> : <p>Aucune</p>}
								</td>
							</tr>
						))
					}
				</tbody>
			</table> */}
			{/* <div className="flex">
				<div className="flex flex-col flex-1">

				</div>

				{selected ? (
					<div className="flex flex-col flex-1 border-l gap-2 p-2">
						{selected.cves.map((cve) => (
							<div>
								<label>{cve.id}</label>
								<p className="ml-4 text-sm">{cve.descriptions}</p>
							</div>
						))}
					</div>
				) : null}
			</div> */}
		</ProbeResultContainer>
	)
}

export default ProbeNmapResult