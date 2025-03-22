export type Investments = {
    amount_invested: number
    created_at: string
    id: number
    investment_date: string
    mutual_fund_id: number
    mutual_fund_name: string
    nav_at_investment: number
    returns: number
};

export type MutualFunds = {
    created_at: string
    current_nav: number
    fund_name: string
    id: number
    isn: string
};

export type MarketCapAllocations = {
    cap_type: string
    created_at: string
    id: number
    mutual_fund_id: number
    percentage: number
};

export type SectorAllocations = {
    created_at: string
    id: number
    mutual_fund_id: number
    percentage: number
    sector: string
};

export type StockAllocations = {
    created_at: string
    id: number
    mutual_fund_id: number
    percentage: number
    stock_name: string
    sector: string
};