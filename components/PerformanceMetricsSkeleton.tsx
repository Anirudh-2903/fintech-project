// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Skeleton } from "@/components/ui/skeleton";

export function PerformanceMetricsSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Performance Summary Skeleton */}
            <div className="mb-6">
                <Skeleton className="h-6 w-48 mb-4" /> {/* Heading */}
                <div className="bg-dark-100 rounded-xl p-4 w-fit">
                    <Skeleton className="h-8 w-40 mb-2" /> {/* Total Portfolio Value */}
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" /> {/* Icon */}
                        <Skeleton className="h-4 w-20" /> {/* Returns */}
                        <Skeleton className="h-4 w-4" /> {/* Divider */}
                        <Skeleton className="h-4 w-20" /> {/* Percentage */}
                    </div>
                </div>
            </div>

            {/* Chart Skeleton */}
            <div className="h-64 w-full"> {/* Ensure full width and fixed height */}
                <Skeleton className="h-full w-full" /> {/* Chart Placeholder */}
            </div>

            {/* Time Period Buttons Skeleton */}
            <div className="flex mt-4 space-x-2 justify-center">
                {['3M', '6M', '1Y', '3Y', '5Y'].map((period) => (
                    <Skeleton key={period} className="h-8 w-12 rounded" />
                    ))}
            </div>
        </div>
    );
}