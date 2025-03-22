"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { StockAllocations, MutualFunds } from "@/types";

interface SectorData {
    sector: string;
    amount: string;
    percentage: string;
    bg: string;
    size: string;
}

interface SectorAllocationProps {
    data: SectorData[];
    stockAllocations: StockAllocations[];
    mutualFunds: MutualFunds[];
}

export default function SectorAllocation({ data, stockAllocations, mutualFunds }: SectorAllocationProps) {
    const [selectedSector, setSelectedSector] = useState<string | null>(null);
    const [selectedCardBg, setSelectedCardBg] = useState<string | null>(null);

    const sectorStocks = selectedSector
        ? stockAllocations.filter((stock) => stock.sector === selectedSector)
        : [];

    const groupedStocks = sectorStocks.reduce((acc, stock) => {
        if (!acc[stock.stock_name]) {
            acc[stock.stock_name] = {
                stockName: stock.stock_name,
                mutualFunds: [],
            };
        }
        const mutualFund = mutualFunds.find((fund) => fund.id === stock.mutual_fund_id);
        if (mutualFund) {
            acc[stock.stock_name].mutualFunds.push(mutualFund.fund_name);
        }
        return acc;
    }, {} as Record<string, { stockName: string; mutualFunds: string[] }>);

    return (
        <div className="bg-dark-200 border-dark-200 p-6 rounded-xl mb-6">
            <h2 className="text-white text-lg font-semibold mb-4">Sector Allocation</h2>
            <div className="grid grid-cols-6 gap-4 grid-rows-2 w-full h-80">
                {data.map((sector, index) => (
                    <Card
                        key={index}
                        className={`${sector.bg} p-4 flex flex-col justify-between cursor-pointer ${sector.size}`}
                        onClick={() => {
                            setSelectedSector(sector.sector);
                            setSelectedCardBg(sector.bg);
                        }}
                    >
                        <CardContent className="p-0">
                            <p className="text-md font-semibold text-text-400">{sector.sector}</p>
                            <p className="text-sm text-text-400">{sector.amount}</p>
                            <p className="text-3xl font-bold mt-12 text-text-400">{sector.percentage}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Dialog to display sector stocks */}
            <Dialog open={!!selectedSector} onOpenChange={(open) => !open && setSelectedSector(null)}>
                <DialogContent className={`${selectedCardBg} border-dark-200 text-text-400 max-w-2xl`}>
                    <DialogHeader>
                        <DialogTitle className="text-xl">{selectedSector} Stocks</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        {Object.values(groupedStocks).map((stock, index) => (
                            <Card key={index} className="bg-card-500 border-dark-100">
                                <CardContent className="p-4">
                                    <p className="font-semibold text-text-400">{stock.stockName}</p>
                                    <div className="mt-2 space-y-1">
                                        {stock.mutualFunds.map((fund, idx) => (
                                            <p key={idx} className="text-sm text-dark-100">
                                                • {fund}
                                            </p>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}