import { Card, CardContent } from "@/components/ui/card";

interface SectorData {
    sector: string;
    amount: string;
    percentage: string;
    bg: string;
    size: string;
}

interface SectorAllocationProps {
    data: SectorData[];
}

export default function SectorAllocation({ data }: SectorAllocationProps) {
    return (
        <div className="bg-dark-200 border-dark-200 p-6 rounded-xl mb-6">
            <h2 className="text-white text-lg font-semibold mb-4">Sector Allocation</h2>
            <div className="grid grid-cols-6 gap-4 grid-rows-2 w-full h-80">
                {data.map((sector, index) => (
                    <Card key={index} className={`${sector.bg} p-4 flex flex-col justify-between ${sector.size}`}>
                        <CardContent className="p-0">
                            <p className="text-md font-semibold text-text-400">{sector.sector}</p>
                            <p className="text-sm  text-text-400">{sector.amount}</p>
                            <p className="text-3xl font-bold mt-12 text-text-400">{sector.percentage}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}