// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';

const FundOverlapSankeyChart = () => {
    const chartRef = useRef(null);
    const [selectedFund, setSelectedFund] = useState(null);
    const funds = [
        { name: "Nippon Large Cap Fund - Direct Plan", color: "#a08f5d", id: 0 },
        { name: "Motilal Large Cap Fund - Direct Plan", color: "#1e6091", id: 1 },
        { name: "HDFC Large Cap Fund", color: "#8b5d3b", id: 2 },
        { name: "ICICI Prudential Midcap Fund", color: "#5b6d35", id: 3 }
    ];

    const stocks = [
        { name: "HDFC LTD.", color: "#e5b012", id: 4 },
        { name: "RIL", color: "#1ea361", id: 5 },
        { name: "INFY", color: "#bb49d3", id: 6 },
        { name: "TCS", color: "#17b8c1", id: 7 },
        { name: "HDFCBANK", color: "#e5504d", id: 8 },
        { name: "BHARTIARTL", color: "#e57e42", id: 9 }
    ];

    // Create nodes array
    const nodes = [...funds, ...stocks];

    // Create links with dummy values (you'd replace these with real data)
    const links = [
        // Nippon Large Cap Fund connections
        { source: 0, target: 4, value: 20, fundId: 0 },
        { source: 0, target: 5, value: 15, fundId: 0 },
        { source: 0, target: 6, value: 10, fundId: 0 },
        { source: 0, target: 7, value: 12, fundId: 0 },
        { source: 0, target: 9, value: 8, fundId: 0 },

        // Motilal Large Cap Fund connections
        { source: 1, target: 4, value: 15, fundId: 1 },
        { source: 1, target: 5, value: 18, fundId: 1 },
        { source: 1, target: 6, value: 14, fundId: 1 },
        { source: 1, target: 7, value: 16, fundId: 1 },
        { source: 1, target: 9, value: 10, fundId: 1 },

        // HDFC Large Cap Fund connections
        { source: 2, target: 4, value: 25, fundId: 2 },
        { source: 2, target: 6, value: 8, fundId: 2 },
        { source: 2, target: 7, value: 20, fundId: 2 },
        { source: 2, target: 8, value: 22, fundId: 2 },
        { source: 2, target: 9, value: 6, fundId: 2 },

        // ICICI Prudential Midcap Fund connections
        { source: 3, target: 4, value: 5, fundId: 3 },
        { source: 3, target: 6, value: 10, fundId: 3 },
        { source: 3, target: 7, value: 6, fundId: 3 },
        { source: 3, target: 8, value: 7, fundId: 3 },
        { source: 3, target: 9, value: 18, fundId: 3 }
    ];

    useEffect(() => {
        if (chartRef.current) {
            drawSankey();
        }
        // Recalculate metrics when selectedFund changes
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { stockCount, overlapPercentage } = getOverlapMetrics(selectedFund);
        // You might want to set these values in state if you need to use them elsewhere
    }, [selectedFund]);



    const drawSankey = () => {
        // Clear previous chart
        d3.select(chartRef.current).selectAll("*").remove();

        // Set dimensions
        const margin = { top: 10, right: 100, bottom: 0, left: 200 };
        const width = 900 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // Setup SVG
        const svg = d3.select(chartRef.current)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Define funds and stocks
        // Set up Sankey generator
        const sankey = d3Sankey.sankey()
            .nodeWidth(30)
            .nodePadding(10)
            .extent([[0, 0], [width, height]]);

        // Generate layout
        const sankeyData = sankey({
            nodes: nodes.map(d => Object.assign({}, d)),
            links: links.map(d => Object.assign({}, d))
        });

        // Draw links
        svg.append("g")
            .selectAll("path")
            .data(sankeyData.links)
            .enter()
            .append("path")
            .attr("d", d3Sankey.sankeyLinkHorizontal())
            .attr("stroke-width", d => Math.max(1, d.width))
            .attr("stroke", d => {
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
            .attr("class", d => `link-${d.fundId}`);

        // Draw nodes
        const nodes_g = svg.append("g")
            .selectAll("rect")
            .data(sankeyData.nodes)
            .enter()
            .append("g");

        // Add rectangles for nodes
        nodes_g.append("rect")
            .attr("x", d => d.x0)
            .attr("y", d => d.y0)
            .attr("height", d => d.y1 - d.y0)
            .attr("width", d => d.x1 - d.x0)
            .attr("fill", d => {
                // Highlight nodes of selected fund or connected stocks
                if (selectedFund === null) {
                    return d.color;
                } else if (d.id < funds.length) {
                    // This is a fund
                    return d.id === selectedFund ? d.color : `${d.color}88`;
                } else {
                    // This is a stock - check if it's connected to the selected fund
                    const isConnected = links.some(link =>
                        link.fundId === selectedFund && link.target === d.id
                    );
                    return isConnected ? d.color : `${d.color}88`;
                }
            })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("cursor", d => d.id < funds.length ? "pointer" : "default")
            .attr("class", d => `node-${d.id}`)
            .on("click", (event, d) => {
                // Only make funds clickable
                if (d.id < funds.length) {
                    // Toggle selection
                    setSelectedFund(selectedFund === d.id ? null : d.id);
                }
            });

        // Add labels for nodes
        nodes_g.append("text")
            .attr("x", d => d.index < funds.length ? d.x0 - 6 : d.x1 + 6)
            .attr("y", d => (d.y1 + d.y0) / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", d => d.index < funds.length ? "end" : "start")
            .text(d => d.name)
            .attr("font-size", "10px") // Adjust font size if necessary
            .attr("fill", d => {
                if (selectedFund === null) {
                    return "white";
                } else if (d.id < funds.length) {
                    return d.id === selectedFund ? "white" : "rgba(255, 255, 255, 0.5)";
                } else {
                    const isConnected = links.some(link =>
                        link.fundId === selectedFund && link.target === d.id
                    );
                    return isConnected ? "white" : "rgba(255, 255, 255, 0.5)";
                }
            })
            .attr("cursor", d => d.id < funds.length ? "pointer" : "default")
            .on("click", (event, d) => {
                if (d.id < funds.length) {
                    setSelectedFund(selectedFund === d.id ? null : d.id);
                }
            });
    };

    // Calculate overlap metrics


    const getOverlapMetrics = (selectedFund) => {
        if (selectedFund === null) {
            // Calculate overall metrics when no fund is selected
            const allStocks = new Set(links.map(link => link.target));
            const totalStocks = allStocks.size;
            const totalLinks = links.length;

            return {
                stockCount: totalStocks,
                overlapPercentage: ((totalLinks / (funds.length * stocks.length)) * 100).toFixed(2) + "%"
            };
        } else {
            // Calculate metrics for the selected fund
            const connectedStocks = new Set(links.filter(link => link.fundId === selectedFund).map(link => link.target));
            const stockCount = connectedStocks.size;
            const overlapPercentage = ((stockCount / stocks.length) * 100).toFixed(2) + "%";

            return {
                stockCount,
                overlapPercentage
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
                            <TooltipContent className="bg-gray-800 text-white border-gray-700">
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
                    <div className="mt-4 p-2 bg-gray-900 rounded-md text-sm">
                        <p>Showing connections for: <span className="font-bold">{
                            selectedFund === 0 ? "Nippon Large Cap Fund" :
                                selectedFund === 1 ? "Motilal Large Cap Fund" :
                                    selectedFund === 2 ? "HDFC Large Cap Fund" :
                                        "ICICI Prudential Midcap Fund"
                        }</span></p>
                        <p className="text-gray-400 text-xs mt-1">Click the fund again to clear selection</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default FundOverlapSankeyChart;