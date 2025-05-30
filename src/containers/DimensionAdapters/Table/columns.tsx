import { ColumnDef } from '@tanstack/react-table'
import type { IAdapterRow } from './types'
import {
	CategoryColumn,
	ChainsColumn,
	Change1dColumn,
	Change1mColumn,
	Change7dColumn,
	ChangeColumn,
	DominanceColumn,
	NameColumn,
	Total24hColumn,
	TotalAllTimeColumn,
	TVLColumn,
	VolumeTVLColumn,
	XColumn
} from './common'
import { formatColumnOrder } from '~/components/Table/utils'

export const getColumnsByType = (type: string, allChains?: boolean, isSimple?: boolean) => {
	switch (type) {
		case 'dexs':
			return dexsColumns(allChains)
		case 'fees':
			return isSimple ? simpleFeesColumns(allChains) : feesColumns(allChains)
		case 'incentives':
			return incentivesColumns(allChains)
		case 'options':
			return optionsColumns(allChains)
		case 'aggregators':
			return aggregatorsColumns(allChains)
		case 'derivatives':
			return perpsColumns(allChains)
		case 'derivatives-aggregator':
			return perpsAggregatorColumns(allChains)
		case 'bridge-aggregators':
			return bridgeAggregatorsColumns(allChains)
		default:
			return dexsColumns(allChains)
	}
}

export const getColumnsOrdernSizeByType = (type: string) => {
	switch (type) {
		case 'volumes':
			return {
				order: volumesTableColumnOrders,
				size: dexsColumnSizes
			}
		case 'fees':
			return {
				order: feesTableColumnOrders,
				size: feesColumnSizes
			}
		default:
			return {
				order: volumesTableColumnOrders,
				size: dexsColumnSizes
			}
	}
}

export const dexsColumns = (allChains?: boolean): ColumnDef<IAdapterRow>[] =>
	[
		NameColumn('dexs', allChains),
		allChains ? undefined : ChainsColumn('dexs'),
		// Change1dColumn,
		// Change7dColumn,
		// Change1mColumn,
		ChangeColumn('Weekly change', 'change_7dover7d', 160, 'Change of last 7d volume over the previous 7d volume'),
		Total24hColumn('Volume', undefined, `Yesterday's volume, updated daily at 00:00UTC`),
		Total24hColumn('Volume', 'total7d', `Cumulative last 7d volume`, undefined, 'Volume (7d)'),
		TVLColumn,
		TotalAllTimeColumn('volume'),
		allChains ? undefined : VolumeTVLColumn,
		DominanceColumn,
		Total24hColumn('Volume', 'total30d', `Cumulative last 30d volume`, undefined, 'Volume (30d)')
	].filter((c) => c !== undefined)

export const perpsColumns = (allChains?: boolean): ColumnDef<IAdapterRow>[] =>
	[
		NameColumn('perps', allChains),
		allChains ? undefined : ChainsColumn('perps'),
		Change1dColumn,
		Change7dColumn,
		Change1mColumn,
		Total24hColumn('Volume', undefined, `Yesterday's volume, updated daily at 00:00UTC`),
		Total24hColumn('Volume', 'total7d', `Cumulative last 7d volume`, undefined, 'Volume (7d)'),
		Total24hColumn('Open Interest', 'dailyOpenInterest', 'updated daily at 00:00UTC', undefined, 'Open Interest', true),
		TotalAllTimeColumn('volume'),
		allChains ? undefined : VolumeTVLColumn,
		DominanceColumn
	].filter((c) => c !== undefined)

export const optionsColumns = (allChains?: boolean): ColumnDef<IAdapterRow>[] =>
	[
		NameColumn('options', allChains),
		allChains ? undefined : ChainsColumn('options'),
		Change1dColumn,
		Change7dColumn,
		Change1mColumn,
		Total24hColumn('Volume', undefined, `Yesterday's volume, updated daily at 00:00UTC`),
		TotalAllTimeColumn('volume'),
		allChains ? undefined : VolumeTVLColumn,
		DominanceColumn
	].filter((c) => c !== undefined)

export const aggregatorsColumns = (allChains?: boolean): ColumnDef<IAdapterRow>[] =>
	[
		NameColumn('aggregators', allChains),
		allChains ? undefined : ChainsColumn('aggregators'),
		Change1dColumn,
		Change7dColumn,
		Change1mColumn,
		Total24hColumn('Volume', undefined, `Yesterday's volume, updated daily at 00:00UTC`),
		Total24hColumn('Volume', 'total7d', `Cumulative last 7d volume`, undefined, 'Volume (7d)'),
		TotalAllTimeColumn('volume'),
		DominanceColumn
	].filter((c) => c !== undefined)

export const perpsAggregatorColumns = (allChains?: boolean): ColumnDef<IAdapterRow>[] =>
	[
		NameColumn('perps-aggregators', allChains),
		allChains ? undefined : ChainsColumn('perps-aggregators'),
		Change1dColumn,
		Change7dColumn,
		Change1mColumn,
		Total24hColumn('Volume', undefined, `Yesterday's volume, updated daily at 00:00UTC`),
		Total24hColumn('Open Interest', 'dailyOpenInterest', 'updated daily at 00:00UTC', undefined, 'Open Interest', true),
		TotalAllTimeColumn('volume'),
		allChains ? undefined : VolumeTVLColumn,
		DominanceColumn
	].filter((c) => c !== undefined)

export const bridgeAggregatorsColumns = (allChains?: boolean): ColumnDef<IAdapterRow>[] =>
	[
		NameColumn('bridge-aggregators', allChains),
		allChains ? undefined : ChainsColumn('bridge-aggregators'),
		Change1dColumn,
		Change7dColumn,
		Change1mColumn,
		Total24hColumn('Volume', undefined, `Yesterday's volume, updated daily at 00:00UTC`),
		Total24hColumn('Open Interest', 'dailyOpenInterest', 'updated daily at 00:00UTC', undefined, 'Open Interest', true),
		TotalAllTimeColumn('volume'),
		allChains ? undefined : VolumeTVLColumn,
		DominanceColumn
	].filter((c) => c !== undefined)

export const incentivesColumns = (allChains?: boolean): ColumnDef<IAdapterRow>[] =>
	[
		NameColumn('incentives', allChains),
		allChains ? undefined : ChainsColumn('incentives'),
		Change1dColumn,
		Change7dColumn,
		Change1mColumn,
		Total24hColumn('Incentives', undefined, `Yesterday's volume, updated daily at 00:00UTC`)
	].filter((c) => c !== undefined)

export const feesColumns = (allChains?: boolean): ColumnDef<IAdapterRow>[] =>
	[
		NameColumn('fees', allChains),
		ChainsColumn('fees'),
		CategoryColumn,
		Total24hColumn('Fees', undefined, 'Fees paid by users in the last 24 hours', 140),
		Total24hColumn(
			'Revenue',
			'revenue24h',
			"Subset of fees that the protocol collects for itself, usually going to the protocol treasury, the team or distributed among token holders. This doesn't include any fees distributed to Liquidity Providers.",
			160
		),
		Total24hColumn(
			'Holders revenue',
			'dailyHoldersRevenue',
			'Subset of fees paid by users that are distributed to token holders in the last 24 hours',
			190
		),
		Total24hColumn('Market Cap', 'mcap', undefined, undefined, 'Market Cap'),
		Total24hColumn('Fees', 'total7d', `Cumulative last 7d fees`, undefined, 'Fees (7d)'),
		Total24hColumn('Fees', 'total30d', `Cumulative last 30d fees`, undefined, 'Fees (30d)'),
		Total24hColumn('Fees', 'total1y', `Cumulative last 1y fees`, undefined, 'Fees (1y)', true),
		// Total24hColumn('Fees', 'average1y', `Monthly Average 1y fees`, undefined, 'Avg Fees (1y)', true),
		// Total24hColumn('Incentives', 'emission24h', `Cumulative last 24h incentives`, 180, 'Incentives (24h)', true),
		// Total24hColumn('Incentives', 'emission7d', `Cumulative last 7d incentives`, 180, 'Incentives (7d)', true),
		// Total24hColumn('Incentives', 'emission30d', `Cumulative last 30d incentives`, 180, 'Incentives (30d)', true),
		// Total24hColumn(
		// 	'Net Earnings',
		// 	'netEarnings24h',
		// 	`Cumulative last 24h net earnings`,
		// 	180,
		// 	'Net Earnings (24h)',
		// 	true
		// ),
		// Total24hColumn('Net Earnings', 'netEarnings7d', `Cumulative last 7d net earnings`, 180, 'Net Earnings (7d)', true),
		// Total24hColumn(
		// 	'Net Earnings',
		// 	'netEarnings30d',
		// 	`Cumulative last 30d net earnings`,
		// 	180,
		// 	'Net Earnings (30d)',
		// 	true
		// ),
		Total24hColumn('Revenue', 'revenue7d', `Cumulative last 7d revenue`, 150, 'Revenue (7d)'),
		allChains
			? undefined
			: Total24hColumn('Revenue', 'revenue30d', `Cumulative last 30d revenue`, 160, 'Revenue (30d)'),
		Total24hColumn(
			'Holders revenue',
			'holdersRevenue7d',
			`Cumulative last 7d holders revenue`,
			150,
			'Holders Revenue (7d)'
		),
		allChains
			? undefined
			: Total24hColumn(
					'Holders revenue',
					'holdersRevenue30d',
					`Cumulative last 30d holders revenue`,
					160,
					'Holders Revenue (30d)'
			  ),
		Total24hColumn('Revenue', 'revenue1y', `Cumulative last 1y revenue`, 160, 'Revenue (1y)', true),
		// Total24hColumn('Avg Revenue', 'averageRevenue1y', `Monthly Average 1y revenue`, 180, 'Avg Revenue (1y)', true),
		// TotalAllTimeColumn('fees') tmp
		// Total24hColumn('User fees', 'dailyUserFees', undefined, 150),
		// Total24hColumn('Treasury revenue', 'dailyProtocolRevenue', undefined, 190),
		// Total24hColumn('Creator revenue', 'dailyCreatorRevenue', undefined, 190),
		// Total24hColumn('Supply side revenue', 'dailySupplySideRevenue', undefined, 220),
		// Total24hColumn('Total fees', 'dailyTotalFees', undefined, 220),
		// Total24hColumn('Total revenue', 'dailyTotalRevenue', undefined, 220)
		// ChangeColumn('Weekly change', 'change_7dover7d', 160, 'Change of last 7d fees over the previous 7d fees'),
		// ChangeColumn('Monthly change', 'change_30dover30d', 160, 'Change of last 30d fees over the previous 30d fees'),
		TotalAllTimeColumn('fees'),
		XColumn('P/F', 'pf', undefined, `Market cap / annualized fees`),
		XColumn('P/S', 'ps', undefined, `Market cap / annualized revenue`)
	].filter((c) => c !== undefined)

export const simpleFeesColumns = (allChains?: boolean): ColumnDef<IAdapterRow>[] =>
	[
		NameColumn('fees', allChains, 140),
		Total24hColumn('Fees', undefined, 'Fees paid by users in the last 24 hours', 120),
		Total24hColumn('Fees', 'total7d', `Cumulative last 7d fees`, 120, 'Fees (7d)'),
		Total24hColumn('Fees', 'total30d', `Cumulative last 30d fees`, 120, 'Fees (30d)'),
		Total24hColumn('Fees', 'total1y', `Cumulative last 1y fees`, 120, 'Fees (1y)')
	].filter((c) => c !== undefined)

// key: min width of window/screen
// values: table columns order
export const volumesTableColumnOrders = formatColumnOrder({
	0: [
		'displayName',
		'name',
		'chains',
		'change_7dover7d',
		'total24h',
		'total7d',
		'change_7d',
		'change_1d',
		'change_1m',
		'tvl',
		'volumetvl',
		'dominance',
		'totalAllTime'
	],
	900: [
		'displayName',
		'name',
		'chains',
		'change_7dover7d',
		'change_1d',
		'change_7d',
		'change_1m',
		'total24h',
		'total7d',
		'tvl',
		'volumetvl',
		'dominance',
		'totalAllTime'
	]
})

export const dexsColumnSizes = {
	0: {
		name: 140,
		chains: 140,
		change_1d: 140,
		change_7d: 140,
		change_1m: 140,
		total24h: 160,
		volumetvl: 140,
		dominance: 120
	},
	600: {
		name: 200,
		chains: 120,
		change_1d: 140,
		change_7d: 140,
		change_1m: 140,
		total24h: 160,
		volumetvl: 140,
		dominance: 120
	},
	900: {
		name: 240,
		chains: 140,
		change_1d: 140,
		change_7d: 140,
		change_1m: 140,
		total24h: 160,
		volumetvl: 140,
		dominance: 120
	}
}

// key: min width of window/screen
// values: table columns order
export const feesTableColumnOrders = formatColumnOrder({
	0: [
		'displayName',
		'name',
		'chains',
		'total1dFees',
		'category',
		'total1dRevenue',
		'change_1d',
		'change_1m',
		'total24h',
		'revenue24h',
		'dailyHoldersRevenue',
		'mcap',
		'total7d',
		'change_7dover7d',
		'total30d',
		'total1y',
		'average1y',
		'change_30dover30d',
		'revenue7d',
		'revenue30d',
		'revenue1y',
		'holdersRevenue7d',
		'holdersRevenue30d',
		'averageRevenue1y',
		'dailyRevenue',
		'dailyProtocolRevenue',
		'dailySupplySideRevenue',
		'dailyUserFees',
		'dailyCreatorRevenue',
		'totalAllTime'
	],
	400: [
		'displayName',
		'name',
		'chains',
		'category',
		'total1dFees',
		'total1dRevenue',
		'change_1d',
		'change_1m',
		'total24h',
		'revenue24h',
		'dailyHoldersRevenue',
		'mcap',
		'total7d',
		'revenue7d',
		'holdersRevenue7d',
		'change_7dover7d',
		'total30d',
		'change_30dover30d',
		'revenue30d',
		'holdersRevenue30d',
		'average1y',
		'total1y',
		'averageRevenue1y',
		'revenue1y',
		'dailyRevenue',
		'dailyProtocolRevenue',
		'dailySupplySideRevenue',
		'dailyUserFees',
		'dailyCreatorRevenue',
		'totalAllTime'
	]
})

export const feesColumnSizes = {
	0: {
		name: 140,
		chains: 140,
		change_1d: 140,
		change_7d: 140,
		change_1m: 140,
		total24h: 140,
		volumetvl: 140,
		dominance: 140,
		holdersRevenue7d: 200,
		holdersRevenue30d: 210
	},
	600: {
		name: 200,
		chains: 120,
		change_1d: 140,
		change_7d: 140,
		change_1m: 140,
		total24h: 140,
		volumetvl: 140,
		dominance: 140,
		holdersRevenue7d: 200,
		holdersRevenue30d: 210
	},
	900: {
		name: 240,
		chains: 140,
		change_1d: 140,
		change_7d: 140,
		change_1m: 140,
		total24h: 140,
		volumetvl: 140,
		dominance: 140,
		holdersRevenue7d: 200,
		holdersRevenue30d: 210
	}
}
