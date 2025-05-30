//TODO: import from generic types

//  Response /overview/type
export interface IGetOverviewResponseBody {
	total24h: number
	total7d: number
	total30d: number
	total1y?: number
	average1y: number
	change_1d: number
	change_7d: number
	change_1m: number
	change_7dover7d: number
	dailyRevenue?: number
	dailyUserFees?: number
	dailyHoldersRevenue?: number
	dailyCreatorRevenue?: number
	dailySupplySideRevenue?: number
	dailyProtocolRevenue?: number
	dailyPremiumVolume?: number
	totalDataChartBreakdown: Array<[string, { [protocol: string]: number }]>
	totalDataChart: Array<[number, number]>
	protocols: ProtocolAdaptorSummary[]
	allChains: string[]
	chain: string | null
	mcap?: number
	pf: number | null
	ps: number | null
}

//  Response /summary
export interface ProtocolAdaptorSummaryResponse extends ProtocolAdaptorSummary {
	logo: string | null
	address?: string | null
	url: string
	description: string | null
	audits?: string | null
	category?: string
	twitter?: string | null
	audit_links?: Array<string>
	forkedFrom?: Array<string>
	gecko_id: string | null
	module: string
	totalDataChartBreakdown: Array<[number, IJSON<{ [protocol: string]: number | IJSON<number> }>]>
	totalDataChart: Array<[number, number]>
	total24h: number | null
	total7d: number | null
	totalAllTime: number | null
	change_1d: number | null
	protocolType?: string
	protocolsData: IJSON<{
		chains: string[]
		disabled: boolean
	}> | null
	methodologyURL: string
	allAddresses?: string[]
	latestFetchIsOk: boolean
	linkedProtocols?: string[]
	slug: string
}

///////////////////////////////////////////////////////////////////
export type IJSON<T> = { [key: string]: T }
export type ProtocolAdaptorSummary = {
	name: string
	category?: string
	logo: string
	disabled: boolean
	displayName: string
	change_1d: number
	change_7d: number
	change_1m: number
	total24h: number
	total7d: number
	total30d: number
	total1y: number
	average1y: number
	revenue24h?: number
	revenue7d?: number
	revenue30d?: number
	revenue1y?: number
	bribes24h?: number
	bribes7d?: number
	bribes30d?: number
	bribes1y?: number
	totalAllTimeBribes?: number
	tokenTax24h?: number
	tokenTax7d?: number
	tokenTax30d?: number
	tokenTax1y?: number
	totalAllTimeTokenTax?: number
	averageRevenue1y?: number
	emission24h?: number
	emission7d?: number
	emission30d?: number
	netEarnings24h?: number
	netEarnings7d?: number
	netEarnings30d?: number
	holdersRevenue24h?: number
	holdersRevenue7d?: number
	holdersRevenue30d?: number
	mcap: number | null
	pf: number | null
	ps: number | null
	breakdown24h: IJSON<number>
	chains: Array<string>
	module: string
	totalAllTime: number | null
	parentProtocol?: string
	tvl?: number
	volumetvl?: number
	dominance?: number
	protocolsStats: IJSON<{
		chains: string[]
		disabled: boolean
		total24h: number | null
		total7d: number | null
		total30d: number | null
		change_1d: number | null
		change_7d: number | null
		change_1m: number | null
		breakdown24h: IJSON<number> | null
		total1y: number | null
	}>
	methodology?: string | IJSON<string>
	protocolType?: string
	defillamaId?: string
} & ExtraTypes

type ExtraTypes = {
	dailyRevenue?: number | null
	dailyUserFees?: number | null
	dailyHoldersRevenue?: number | null
	dailyCreatorRevenue?: number | null
	dailySupplySideRevenue?: number | null
	dailyProtocolRevenue?: number | null
	dailyPremiumVolume?: number | null
	dailyBribesRevenue?: number | null
	dailyTokenTaxes?: number | null
}
