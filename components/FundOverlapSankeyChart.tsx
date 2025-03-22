// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import * as d3 from "d3";
import * as d3Sankey from "d3-sankey";
import { MutualFunds, StockAllocations } from "@/types";

interface FundOverlapSankeyChartProps {
    mutual_funds: MutualFunds[];
    stock_allocations: StockAllocations[];
}

const FundOverlapSankeyChart = ({ mutual_funds, stock_allocations }: FundOverlapSankeyChartProps) => {
    const chartRef = useRef(null);
    const [selectedFund, setSelectedFund] = useState<number | null>(null);

    // Map mutual_funds to the funds array
    const funds = mutual_funds.map((fund, index) => ({
        name: fund.fund_name,
        color: ["#a08f5d", "#1e6091", "#8b5d3b", "#5b6d35"][index % 4], // Assign colors in a cycle
        id: index,
    }));

    // Utility function to split names into two lines
    const splitNameIntoTwoLines = (name: string, maxChars: number = 15): string[] => {
        const words = name.split(" ");
        let line1 = "";
        let line2 = "";
        for (const word of words) {
            if ((line1 + word).length <= maxChars) {
                line1 += (line1 ? " " : "") + word;
            } else {
                line2 += (line2 ? " " : "") + word;
            }
        }
        return [line1, line2];
    };

    // Extract unique stocks from stock_allocations
    const uniqueStocks = Array.from(new Set(stock_allocations.map((allocation) => allocation.stock_name)));

    // Map unique stocks to the stocks array
    const stocks = uniqueStocks.map((stock, index) => ({
        name: stock,
        color: ["#e5b012", "#1ea361", "#bb49d3", "#17b8c1", "#e5504d", "#e57e42"][index % 6], // Assign colors in a cycle
        id: funds.length + index, // Ensure unique IDs by offsetting with funds.length
    }));

    // Create links from stock_allocations
    const links = stock_allocations.map((allocation) => {
        const fundIndex = mutual_funds.findIndex((fund) => fund.id === allocation.mutual_fund_id);
        const stockIndex = uniqueStocks.findIndex((stock) => stock === allocation.stock_name);
        return {
            source: fundIndex, // Index of the fund in the funds array
            target: funds.length + stockIndex, // Index of the stock in the stocks array
            value: allocation.percentage, // Use the percentage as the link value
            fundId: fundIndex, // ID of the fund for highlighting
        };
    });

    useEffect(() => {
        if (chartRef.current) {
            drawSankey();
        }
    }, [selectedFund, mutual_funds, stock_allocations]);

    const drawSankey = () => {
        // Clear previous chart
        d3.select(chartRef.current).selectAll("*").remove();

        // Set dimensions with reduced margins
        const margin = { top: 10, right: 80, bottom: 10, left: 85 }; // Reduced margins
        const width = 900 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Setup SVG
        const svg = d3.select(chartRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Set up Sankey generator
        const sankey = d3Sankey.sankey()
            .nodeWidth(30)
            .nodePadding(10)
            .extent([[0, 0], [width, height]]);

        // Generate layout
        const sankeyData = sankey({
            nodes: [...funds, ...stocks].map((d) => Object.assign({}, d)),
            links: links.map((d) => Object.assign({}, d)),
        });

        // Draw links
        svg.append("g")
            .selectAll("path")
            .data(sankeyData.links)
            .enter()
            .append("path")
            .attr("d", d3Sankey.sankeyLinkHorizontal())
            .attr("stroke-width", (d) => Math.max(1, d.width))
            .attr("stroke", (d) => {
                // Highlight links of selected fund, dim others
                if (selectedFund === null) {
                    return "rgba(150, 150, 150, 0.3)";
                } else if (d.fundId === selectedFund) {
                    return "rgba(255, 255, 255, 0.7)";
                } else {
                    return "rgba(150, 150, 150, 0.1)";
                }
            })
            .attr("fill", "none")
            .attr("class", (d) => `link-${d.fundId}`);

        // Draw nodes
        const nodes_g = svg.append("g")
            .selectAll("rect")
            .data(sankeyData.nodes)
            .enter()
            .append("g");

        // Add rectangles for nodes
        nodes_g.append("rect")
            .attr("x", (d) => d.x0)
            .attr("y", (d) => d.y0)
            .attr("height", (d) => d.y1 - d.y0)
            .attr("width", (d) => d.x1 - d.x0)
            .attr("fill", (d) => {
                // Highlight nodes of selected fund or connected stocks
                if (selectedFund === null) {
                    return d.color;
                } else if (d.id < funds.length) {
                    // This is a fund
                    return d.id === selectedFund ? d.color : `${d.color}88`;
                } else {
                    // This is a stock - check if it's connected to the selected fund
                    const isConnected = links.some((link) =>
                        link.fundId === selectedFund && link.target === d.id
                    );
                    return isConnected ? d.color : `${d.color}88`;
                }
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("cursor", (d) => (d.id < funds.length ? "pointer" : "default"))
            .attr("class", (d) => `node-${d.id}`)
            .on("click", (event, d) => {
                // Only make funds clickable
                if (d.id < funds.length) {
                    // Toggle selection
                    setSelectedFund(selectedFund === d.id ? null : d.id);
                }
            });

        // Add labels for nodes
        nodes_g.append("text")
            .attr("x", (d) => (d.id < funds.length ? d.x0 - 6 : d.x1 + 6))
            .attr("y", (d) => (d.y1 + d.y0) / 2)
            .attr("dy", (d) => {
                const name = d.name;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const [line1, line2] = splitNameIntoTwoLines(name);
                // Adjust vertical offset based on the number of lines
                return line2 ? "-0.6em" : "0.35em"; // Move up slightly for two-line labels
            })
            .attr("text-anchor", (d) => (d.id < funds.length ? "end" : "start"))
            .attr("font-size", "10px")
            .attr("fill", (d) => {
                if (selectedFund === null) {
                    return "white";
                } else if (d.id < funds.length) {
                    return d.id === selectedFund ? "white" : "rgba(255, 255, 255, 0.5)";
                } else {
                    const isConnected = links.some((link) =>
                        link.fundId === selectedFund && link.target === d.id
                    );
                    return isConnected ? "white" : "rgba(255, 255, 255, 0.5)";
                }
            })
            .attr("cursor", (d) => (d.id < funds.length ? "pointer" : "default"))
            .selectAll("tspan")
            .data((d) => {
                const name = d.name;
                const [line1, line2] = splitNameIntoTwoLines(name);
                return line2 ? [line1, line2] : [line1]; // Return an array of lines
            })
            .enter()
            .append("tspan")
            .attr("x", (d, i, nodes) => {
                const parentNode = nodes[i].parentNode;
                return d3.select(parentNode).attr("x");
            })
            .attr("dy", (d, i) => (i === 0 ? "0" : "1.2em")) // Adjust line spacing
            .text((d) => d);

        // Add click handler for fund names
        nodes_g.selectAll("text")
            .on("click", (event, d) => {
                if (d.id < funds.length) {
                    setSelectedFund(selectedFund === d.id ? null : d.id);
                }
            });
    };
    // Calculate overlap metrics
    const getOverlapMetrics = (selectedFund: number | null) => {
        if (selectedFund === null) {
            // Calculate overall metrics when no fund is selected
            const allStocks = new Set(links.map((link) => link.target));
            const totalStocks = allStocks.size;
            const totalLinks = links.length;

            return {
                stockCount: totalStocks,
                overlapPercentage: ((totalLinks / (funds.length * stocks.length)) * 100).toFixed(2) + "%",
            };
        } else {
            // Calculate metrics for the selected fund
            const connectedStocks = new Set(
                links.filter((link) => link.fundId === selectedFund).map((link) => link.target)
            );
            const stockCount = connectedStocks.size;
            const overlapPercentage = ((stockCount / stocks.length) * 100).toFixed(2) + "%";

            return {
                stockCount,
                overlapPercentage,
            };
        }
    };

    const { stockCount, overlapPercentage } = getOverlapMetrics(selectedFund);

    return (
        <Card className="w-full bg-dark-200 border-dark-200 rounded-xl text-white">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-xl text-white">Overlap Analysis</CardTitle>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent className="bg-dark-200 text-white border-dark-200">
                                <p>Visualizes the stock overlap between funds. Click on a fund to highlight its connections.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                    <li className="text-gray-300">
                        <span className="font-bold text-white">{stockCount} Stocks Overlap</span> across these funds.
                    </li>
                    <li className="text-gray-300">
                        <span className="font-bold text-white">{overlapPercentage} Average Overlap</span> in holdings.
                    </li>
                </ul>
            </CardHeader>
            <CardContent>
                <div
                    ref={chartRef}
                    className="w-full h-[500px] flex items-center justify-center"
                />
                {selectedFund !== null && (
                    <div className="mt-4 p-2 bg-dark-200 rounded-md text-sm">
                        <p>Showing connections for: <span className="font-bold">{mutual_funds[selectedFund].fund_name}</span></p>
                        <p className="text-gray-400 text-xs mt-1">Click the fund again to clear selection</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default FundOverlapSankeyChart;