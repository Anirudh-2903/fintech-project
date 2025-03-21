import { Card, CardContent } from "@/components/ui/card";

const data = [
    { sector: "Financial", amount: "₹1,95,000", percentage: "34%", bg: "bg-blue-300" },
    { sector: "Healthcare", amount: "₹83,250", percentage: "14.5%", bg: "bg-blue-400" },
    { sector: "Technology", amount: "₹1,11,000", percentage: "19%", bg: "bg-purple-300" },
    { sector: "Consumer Goods", amount: "₹55,500", percentage: "9.5%", bg: "bg-purple-200" },
    { sector: "Energy", amount: "₹55,500", percentage: "9.5%", bg: "bg-purple-200" },
    { sector: "Other Sectors", amount: "₹55,500", percentage: "9.5%", bg: "bg-purple-200" },
];

export default function SectorAllocation() {
    return (
        <div className="flex flex-col">
            Sector Allocation
        </div>
    );
}
