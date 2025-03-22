// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import PortfolioComposition from "@/components/PortfolioComposition";
import { createClient } from '@/supabase/server'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: investments } = await supabase.from('investments').select()
  const { data: mutual_funds } = await supabase.from('mutual_funds').select()
  const { data: market_cap_allocations } = await supabase.from('market_cap_allocations').select()
  const { data: sector_allocations } = await supabase.from('sector_allocations').select()
  const { data: stock_allocations } = await supabase.from('stock_allocations').select()

  // Calculate total initial investment
  const totalInitialInvestment = investments?.reduce((sum, investment) => sum + investment.amount_invested, 0) || 0;

  // Calculate total current investment value
  const totalCurrentInvestment = investments?.reduce((sum, investment) => {
    const currentValue = investment.amount_invested * (1 + investment.returns / 100);
    return sum + currentValue;
  }, 0) || 0;

  // Find best and worst performing investments
  const bestPerforming = investments?.reduce((best, investment) => investment.returns > best.returns ? investment : investments[0]);
  const worstPerforming = investments?.reduce((worst, investment) => {
    return investment.returns < worst.returns ? investment : worst;
  }, investments[0]);


  return (
      <div className="flex flex-col min-h-screen bg-background text-white">
        <Header />
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Content */}
          <div className="flex-1">
            <main className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl text-text-100 font-semibold">Good morning, Anirudh!</h1>
                <p className="text-text-100">Evaluate Your Investment Performance</p>
              </div>

              {/* Investment Cards */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {/* Current Investment */}
                <Card className="bg-card-background border-card-background">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-1">
                      <div className="w-1 h-6 bg-card-foreground mr-2"></div>
                      <div>
                        <div className="text-sm text-text-100">Current</div>
                        <div className="text-sm text-text-100">Investment Value</div>
                      </div>
                      <div className="ml-auto flex flex-col items-center">
                        <div className="flex flex-row gap-1">
                          <svg width="14" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.778 0.555538V4.99985C15.778 5.14718 15.7195 5.28849 15.6153 5.39267C15.5111 5.49685 15.3698 5.55538 15.2225 5.55538C15.0752 5.55538 14.9339 5.49685 14.8297 5.39267C14.7255 5.28849 14.667 5.14718 14.667 4.99985V1.89647L8.94908 7.61504C8.89749 7.66669 8.83622 7.70767 8.76878 7.73563C8.70134 7.76358 8.62905 7.77797 8.55604 7.77797C8.48303 7.77797 8.41074 7.76358 8.3433 7.73563C8.27586 7.70767 8.21459 7.66669 8.163 7.61504L5.77835 5.2297L1.17155 9.8372C1.06731 9.94144 0.925923 10 0.778504 10C0.631084 10 0.489702 9.94144 0.38546 9.8372C0.281219 9.73295 0.222656 9.59157 0.222656 9.44415C0.222656 9.29673 0.281219 9.15535 0.38546 9.05111L5.3853 4.05126C5.4369 3.99961 5.49817 3.95864 5.56561 3.93068C5.63305 3.90272 5.70534 3.88833 5.77835 3.88833C5.85136 3.88833 5.92365 3.90272 5.99109 3.93068C6.05853 3.95864 6.1198 3.99961 6.17139 4.05126L8.55604 6.43661L13.8816 1.11108H10.7782C10.6309 1.11108 10.4896 1.05255 10.3854 0.948363C10.2812 0.84418 10.2227 0.702876 10.2227 0.555538C10.2227 0.4082 10.2812 0.266897 10.3854 0.162714C10.4896 0.0585299 10.6309 0 10.7782 0H15.2225C15.3698 0 15.5111 0.0585299 15.6153 0.162714C15.7195 0.266897 15.778 0.4082 15.778 0.555538Z"
                                fill="#6BBD6E" />
                          </svg>
                          <span className="text-xs text-green">+{((totalCurrentInvestment - totalInitialInvestment) / totalInitialInvestment * 100).toFixed(2)}%</span>
                        </div>
                        <div className="text-xs text-green">1D Return</div>
                      </div>
                    </div>
                    <div className="mt-4 text-2xl text-text-200 font-bold">{totalCurrentInvestment.toLocaleString('en-IN', { style: 'currency', currency: 'INR' ,maximumFractionDigits: 0})}</div>
                  </CardContent>
                </Card>

                {/* Initial Investment */}
                <Card className="bg-card-background border-card-background">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-1">
                      <div className="w-1 h-6 bg-card-foreground mr-2"></div>
                      <div>
                        <div className="text-sm text-text-100">Initial</div>
                        <div className="text-sm text-text-100">Investment Value</div>
                      </div>
                      <div className="ml-auto flex flex-col items-center">
                        <div className="flex flex-row gap-1">
                          <svg width="14" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.778 0.555538V4.99985C15.778 5.14718 15.7195 5.28849 15.6153 5.39267C15.5111 5.49685 15.3698 5.55538 15.2225 5.55538C15.0752 5.55538 14.9339 5.49685 14.8297 5.39267C14.7255 5.28849 14.667 5.14718 14.667 4.99985V1.89647L8.94908 7.61504C8.89749 7.66669 8.83622 7.70767 8.76878 7.73563C8.70134 7.76358 8.62905 7.77797 8.55604 7.77797C8.48303 7.77797 8.41074 7.76358 8.3433 7.73563C8.27586 7.70767 8.21459 7.66669 8.163 7.61504L5.77835 5.2297L1.17155 9.8372C1.06731 9.94144 0.925923 10 0.778504 10C0.631084 10 0.489702 9.94144 0.38546 9.8372C0.281219 9.73295 0.222656 9.59157 0.222656 9.44415C0.222656 9.29673 0.281219 9.15535 0.38546 9.05111L5.3853 4.05126C5.4369 3.99961 5.49817 3.95864 5.56561 3.93068C5.63305 3.90272 5.70534 3.88833 5.77835 3.88833C5.85136 3.88833 5.92365 3.90272 5.99109 3.93068C6.05853 3.95864 6.1198 3.99961 6.17139 4.05126L8.55604 6.43661L13.8816 1.11108H10.7782C10.6309 1.11108 10.4896 1.05255 10.3854 0.948363C10.2812 0.84418 10.2227 0.702876 10.2227 0.555538C10.2227 0.4082 10.2812 0.266897 10.3854 0.162714C10.4896 0.0585299 10.6309 0 10.7782 0H15.2225C15.3698 0 15.5111 0.0585299 15.6153 0.162714C15.7195 0.266897 15.778 0.4082 15.778 0.555538Z"
                                fill="#6BBD6E" />
                          </svg>
                          <span className="text-xs text-green">+{((totalCurrentInvestment - totalInitialInvestment) / totalInitialInvestment * 100).toFixed(2)}%</span>
                        </div>
                        <div className="text-xs text-green">&nbsp;</div>
                      </div>
                    </div>
                    <div className="mt-4 text-2xl text-text-200 font-bold">{totalInitialInvestment.toLocaleString('en-IN', { style: 'currency', currency: 'INR',maximumFractionDigits: 0 })}</div>
                  </CardContent>
                </Card>

                {/* Best Performing */}
                <Card className="bg-card-background border-card-background">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-1">
                      <div className="w-1 h-6 bg-card-foreground mr-2"></div>
                      <div>
                        <div className="text-sm text-text-100">Best</div>
                        <div className="text-sm text-text-100">Performing Scheme</div>
                      </div>
                      <div className="ml-auto flex flex-col items-center">
                        <div className="flex flex-row gap-1">
                          <svg width="14" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.778 0.555538V4.99985C15.778 5.14718 15.7195 5.28849 15.6153 5.39267C15.5111 5.49685 15.3698 5.55538 15.2225 5.55538C15.0752 5.55538 14.9339 5.49685 14.8297 5.39267C14.7255 5.28849 14.667 5.14718 14.667 4.99985V1.89647L8.94908 7.61504C8.89749 7.66669 8.83622 7.70767 8.76878 7.73563C8.70134 7.76358 8.62905 7.77797 8.55604 7.77797C8.48303 7.77797 8.41074 7.76358 8.3433 7.73563C8.27586 7.70767 8.21459 7.66669 8.163 7.61504L5.77835 5.2297L1.17155 9.8372C1.06731 9.94144 0.925923 10 0.778504 10C0.631084 10 0.489702 9.94144 0.38546 9.8372C0.281219 9.73295 0.222656 9.59157 0.222656 9.44415C0.222656 9.29673 0.281219 9.15535 0.38546 9.05111L5.3853 4.05126C5.4369 3.99961 5.49817 3.95864 5.56561 3.93068C5.63305 3.90272 5.70534 3.88833 5.77835 3.88833C5.85136 3.88833 5.92365 3.90272 5.99109 3.93068C6.05853 3.95864 6.1198 3.99961 6.17139 4.05126L8.55604 6.43661L13.8816 1.11108H10.7782C10.6309 1.11108 10.4896 1.05255 10.3854 0.948363C10.2812 0.84418 10.2227 0.702876 10.2227 0.555538C10.2227 0.4082 10.2812 0.266897 10.3854 0.162714C10.4896 0.0585299 10.6309 0 10.7782 0H15.2225C15.3698 0 15.5111 0.0585299 15.6153 0.162714C15.7195 0.266897 15.778 0.4082 15.778 0.555538Z"
                                fill="#6BBD6E" />
                          </svg>
                          <span className="text-xs text-green">+{bestPerforming?.returns}%</span>
                        </div>
                        <div className="text-xs text-green">Inception</div>
                      </div>
                    </div>
                    <div className="mt-4 text-text-200">{bestPerforming?.mutual_fund_name}</div>
                  </CardContent>
                </Card>

                {/* Worst Performing */}
                <Card className="bg-card-background border-card-background">
                  <CardContent className="p-4">
                    <div className="flex items-center mb-1">
                      <div className="w-1 h-6 bg-card-foreground mr-2"></div>
                      <div>
                        <div className="text-sm text-text-100">Worst</div>
                        <div className="text-sm text-text-100">Performing Scheme</div>
                      </div>
                      <div className="ml-auto flex flex-col items-center">
                        <div className="flex flex-row gap-1">
                          <svg width="16" height="12" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#EC817D"
                                  d="M9.66712 15.5554H5.22281C5.07547 15.5554 4.93417 15.4969 4.82999 15.3927C4.7258 15.2885 4.66727 15.1472 4.66727 14.9998C4.66727 14.8525 4.7258 14.7112 4.82999 14.607C4.93417 14.5028 5.07547 14.4443 5.22281 14.4443H8.32619L2.60761 8.72643C2.55596 8.67483 2.51499 8.61356 2.48703 8.54612C2.45907 8.47868 2.44468 8.40639 2.44468 8.33338C2.44468 8.26038 2.45907 8.18809 2.48703 8.12065C2.51499 8.0532 2.55596 7.99194 2.60761 7.94034L4.99296 5.55569L0.385461 0.948891C0.281219 0.844649 0.222656 0.703267 0.222656 0.555847C0.222656 0.408427 0.281219 0.267045 0.385461 0.162804C0.489702 0.0585623 0.631084 0 0.778504 0C0.925924 0 1.06731 0.0585623 1.17155 0.162804L6.17139 5.16265C6.22305 5.21424 6.26402 5.27551 6.29198 5.34295C6.31993 5.4104 6.33432 5.48269 6.33432 5.55569C6.33432 5.6287 6.31993 5.70099 6.29198 5.76843C6.26402 5.83587 6.22305 5.89714 6.17139 5.94874L3.78605 8.33338L9.11158 13.6589V10.5555C9.11158 10.4082 9.17011 10.2669 9.27429 10.1627C9.37848 10.0585 9.51978 10 9.66712 10C9.81446 10 9.95576 10.0585 10.0599 10.1627C10.1641 10.2669 10.2227 10.4082 10.2227 10.5555V14.9998C10.2227 15.1472 10.1641 15.2885 10.0599 15.3927C9.95576 15.4969 9.81446 15.5554 9.66712 15.5554Z" />
                          </svg>
                          <span className="text-xs text-red">{worstPerforming?.returns}%</span>
                        </div>
                        <div className="text-xs text-red">Inception</div>
                      </div>
                    </div>
                    <div className="mt-4 text-text-200">{worstPerforming?.mutual_fund_name}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Tabs */}
              <Tabs defaultValue="metrics" className="mb-8">
                <TabsList className="border-b border-gray-800 w-full justify-start bg-transparent text-text-200 gap-4">
                  <TabsTrigger
                      value="metrics"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-blue data-[state=active]:text-text-100 data-[state=active]:font-bold  data-[state=active]:bg-transparent rounded-none p-2"
                  >
                    Performance Metrics
                  </TabsTrigger>
                  <TabsTrigger
                      value="composition"
                      className="data-[state=active]:border-b-2 data-[state=active]:text-text-100 data-[state=active]:font-bold data-[state=active]:border-blue data-[state=active]:bg-transparent rounded-none p-2"
                  >
                    Portfolio Composition
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="metrics" className="p-6 mt-10 rounded-xl bg-dark-200">
                  <PerformanceMetrics investments={investments} />
                </TabsContent>

                <TabsContent value="composition">
                  <PortfolioComposition investments={investments} mutual_funds={mutual_funds} market_cap_allocations={market_cap_allocations} sector_allocations={sector_allocations} stock_allocations={stock_allocations} />
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      </div>
  )
}