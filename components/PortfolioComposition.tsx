"use client";

import React from "react";
import FundOverlapSankeyChart from "@/components/FundOverlapSankeyChart";
import SectorAllocation from "@/components/SectorAllocation";

const PortfolioComposition = () => {
    return (
        <main className="container mx-auto py-10">
            <SectorAllocation />
            <FundOverlapSankeyChart />
        </main>
    );
};

export default PortfolioComposition;