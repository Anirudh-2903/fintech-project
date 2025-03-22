"use client";

import React from "react";
import FundOverlapSankeyChart from "@/components/FundOverlapSankeyChart";
import SectorAllocation from "@/components/SectorAllocation";
import { Investments, MarketCapAllocations, MutualFunds, SectorAllocations, StockAllocations } from "@/types";

const PortfolioComposition = (
    { mutual_funds, market_cap_allocations, sector_allocations, stock_allocations, investments }:
    { mutual_funds: MutualFunds[], market_cap_allocations: MarketCapAllocations[], sector_allocations: SectorAllocations[], stock_allocations: StockAllocations[], investments: Investments[] }
) => {
    console.log(mutual_funds[0]);
    console.log(market_cap_allocations);
    console.log(sector_allocations);
    console.log(stock_allocations);
    console.log(investments[0]);

    // Static colors and sizes from the sample data
    const staticColorsAndSizes = [
        { bg: "bg-card-100", size: "col-span-4" },
        { bg: "bg-card-200", size: "col-span-2" },
        { bg: "bg-card-300", size: "col-span-2" },
        { bg: "bg-card-400", size: "col-span-4" },
        { bg: "bg-card-500", size: "" },
        { bg: "bg-card-600", size: "" },
    ];

    // Calculate total amount invested across all mutual funds
    const totalAmountInvested = investments.reduce((total, investment) => total + investment.amount_invested, 0);

    // Aggregate sector allocations weighted by amount invested
    const sectorTotals = sector_allocations.reduce((acc, allocation) => {
        // Find the investment for the current mutual fund
        const investment = investments.find(inv => inv.mutual_fund_id === allocation.mutual_fund_id);
        if (!investment) return acc; // Skip if no investment is found

        // Calculate the sector's contribution to the total amount invested
        const sectorContribution = (allocation.percentage / 100) * investment.amount_invested;

        // Add the contribution to the sector's total
        if (!acc[allocation.sector]) {
            acc[allocation.sector] = 0;
        }
        acc[allocation.sector] += sectorContribution;
        return acc;
    }, {} as Record<string, number>);

    // Transform aggregated data to match the expected structure
    const transformedSectorAllocations = Object.entries(sectorTotals).map(([sector, totalAmount], index) => ({
        sector,
        amount: `${totalAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR',maximumFractionDigits: 0 })}`, // Format amount as currency
        percentage: `${((totalAmount / totalAmountInvested) * 100).toFixed(1)}%`, // Calculate percentage of total investment
        ...staticColorsAndSizes[index % staticColorsAndSizes.length], // Cycle through static colors and sizes
    }));

    return (
        <main className="container mx-auto py-10">
            <SectorAllocation data={transformedSectorAllocations}  stockAllocations={stock_allocations}  mutualFunds={mutual_funds}/>
            <FundOverlapSankeyChart  mutual_funds={mutual_funds} stock_allocations={stock_allocations} />
        </main>
    );
};

export default PortfolioComposition;