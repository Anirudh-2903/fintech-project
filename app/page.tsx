// app/page.tsx
'use client'

import {
  Card,
  CardContent
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import PortfolioComposition from "@/components/PortfolioComposition";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default function Dashboard() {

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
              <h1 className="text-2xl text-text-100 font-semibold">Good morning, Yashna!</h1>
              <p className="text-text-100">Evaluate Your Investment Performance</p>
            </div>

            {/* Investment Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {/* Current Investment */}
              <Card className="bg-gray-900 border-gray-800">
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
                          <path d="M15.778 0.555538V4.99985C15.778 5.14718 15.7195 5.28849 15.6153 5.39267C15.5111 5.49685 15.3698 5.55538 15.2225 5.55538C15.0752 5.55538 14.9339 5.49685 14.8297 5.39267C14.7255 5.28849 14.667 5.14718 14.667 4.99985V1.89647L8.94908 7.61504C8.89749 7.66669 8.83622 7.70767 8.76878 7.73563C8.70134 7.76358 8.62905 7.77797 8.55604 7.77797C8.48303 7.77797 8.41074 7.76358 8.3433 7.73563C8.27586 7.70767 8.21459 7.66669 8.163 7.61504L5.77835 5.2297L1.17155 9.8372C1.06731 9.94144 0.925923 10 0.778504 10C0.631084 10 0.489702 9.94144 0.38546 9.8372C0.281219 9.73295 0.222656 9.59157 0.222656 9.44415C0.222656 9.29673 0.281219 9.15535 0.38546 9.05111L5.3853 4.05126C5.4369 3.99961 5.49817 3.95864 5.56561 3.93068C5.63305 3.90272 5.70534 3.88833 5.77835 3.88833C5.85136 3.88833 5.92365 3.90272 5.99109 3.93068C6.05853 3.95864 6.1198 3.99961 6.17139 4.05126L8.55604 6.43661L13.8816 1.11108H10.7782C10.6309 1.11108 10.4896 1.05255 10.3854 0.948363C10.2812 0.84418 10.2227 0.702876 10.2227 0.555538C10.2227 0.4082 10.2812 0.266897 10.3854 0.162714C10.4896 0.0585299 10.6309 0 10.7782 0H15.2225C15.3698 0 15.5111 0.0585299 15.6153 0.162714C15.7195 0.266897 15.778 0.4082 15.778 0.555538Z" fill="#6BBD6E"/>
                        </svg>
                        <span className="text-xs text-green">+0.6%</span>
                      </div>
                      <div className="text-xs text-green">1D Return</div>
                    </div>
                  </div>
                  <div className="mt-4 text-2xl text-text-200 font-bold">₹5,75,000</div>
                </CardContent>
              </Card>

              {/* Initial Investment */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center mb-1">
                    <div className="w-1 h-6 bg-card-foreground mr-2"></div>
                    <div>
                      <div className="text-sm text-text-100">Initial</div>
                      <div className="text-sm text-text-100">Investment Value</div>
                    </div>
                    <div className="ml-auto flex gap-1 items-center">
                      <svg width="14" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.778 0.555538V4.99985C15.778 5.14718 15.7195 5.28849 15.6153 5.39267C15.5111 5.49685 15.3698 5.55538 15.2225 5.55538C15.0752 5.55538 14.9339 5.49685 14.8297 5.39267C14.7255 5.28849 14.667 5.14718 14.667 4.99985V1.89647L8.94908 7.61504C8.89749 7.66669 8.83622 7.70767 8.76878 7.73563C8.70134 7.76358 8.62905 7.77797 8.55604 7.77797C8.48303 7.77797 8.41074 7.76358 8.3433 7.73563C8.27586 7.70767 8.21459 7.66669 8.163 7.61504L5.77835 5.2297L1.17155 9.8372C1.06731 9.94144 0.925923 10 0.778504 10C0.631084 10 0.489702 9.94144 0.38546 9.8372C0.281219 9.73295 0.222656 9.59157 0.222656 9.44415C0.222656 9.29673 0.281219 9.15535 0.38546 9.05111L5.3853 4.05126C5.4369 3.99961 5.49817 3.95864 5.56561 3.93068C5.63305 3.90272 5.70534 3.88833 5.77835 3.88833C5.85136 3.88833 5.92365 3.90272 5.99109 3.93068C6.05853 3.95864 6.1198 3.99961 6.17139 4.05126L8.55604 6.43661L13.8816 1.11108H10.7782C10.6309 1.11108 10.4896 1.05255 10.3854 0.948363C10.2812 0.84418 10.2227 0.702876 10.2227 0.555538C10.2227 0.4082 10.2812 0.266897 10.3854 0.162714C10.4896 0.0585299 10.6309 0 10.7782 0H15.2225C15.3698 0 15.5111 0.0585299 15.6153 0.162714C15.7195 0.266897 15.778 0.4082 15.778 0.555538Z" fill="#6BBD6E"/>
                      </svg>
                      <span className="text-xs text-green">+15%</span>
                    </div>
                  </div>
                  <div className="mt-4 text-2xl text-text-200 font-bold">₹5,00,000</div>
                </CardContent>
              </Card>

              {/* Best Performing */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center mb-1">
                    <div className="w-1 h-6 bg-card-foreground mr-2"></div>
                    <div>
                      <div className="text-sm text-text-100">Best</div>
                      <div className="text-sm text-text-100">Performing Scheme</div>
                    </div>
                    <div className="ml-auto flex gap-1 items-center">
                      <svg width="14" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.778 0.555538V4.99985C15.778 5.14718 15.7195 5.28849 15.6153 5.39267C15.5111 5.49685 15.3698 5.55538 15.2225 5.55538C15.0752 5.55538 14.9339 5.49685 14.8297 5.39267C14.7255 5.28849 14.667 5.14718 14.667 4.99985V1.89647L8.94908 7.61504C8.89749 7.66669 8.83622 7.70767 8.76878 7.73563C8.70134 7.76358 8.62905 7.77797 8.55604 7.77797C8.48303 7.77797 8.41074 7.76358 8.3433 7.73563C8.27586 7.70767 8.21459 7.66669 8.163 7.61504L5.77835 5.2297L1.17155 9.8372C1.06731 9.94144 0.925923 10 0.778504 10C0.631084 10 0.489702 9.94144 0.38546 9.8372C0.281219 9.73295 0.222656 9.59157 0.222656 9.44415C0.222656 9.29673 0.281219 9.15535 0.38546 9.05111L5.3853 4.05126C5.4369 3.99961 5.49817 3.95864 5.56561 3.93068C5.63305 3.90272 5.70534 3.88833 5.77835 3.88833C5.85136 3.88833 5.92365 3.90272 5.99109 3.93068C6.05853 3.95864 6.1198 3.99961 6.17139 4.05126L8.55604 6.43661L13.8816 1.11108H10.7782C10.6309 1.11108 10.4896 1.05255 10.3854 0.948363C10.2812 0.84418 10.2227 0.702876 10.2227 0.555538C10.2227 0.4082 10.2812 0.266897 10.3854 0.162714C10.4896 0.0585299 10.6309 0 10.7782 0H15.2225C15.3698 0 15.5111 0.0585299 15.6153 0.162714C15.7195 0.266897 15.778 0.4082 15.778 0.555538Z" fill="#6BBD6E"/>
                      </svg>
                      <span className="text-xs text-green">+19%</span>
                    </div>
                  </div>
                  <div className="mt-4 text-text-200">ICICI Prudential Midcap Fund</div>
                </CardContent>
              </Card>

              {/* Worst Performing */}
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-center mb-1">
                    <div className="w-1 h-6 bg-card-foreground mr-2"></div>
                    <div>
                      <div className="text-sm text-text-100">Worst</div>
                      <div className="text-sm text-text-100">Performing Scheme</div>
                    </div>
                    <div className="ml-auto gap-1 flex items-center">
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.56 5.00015V9.44446C15.56 9.5918 15.5015 9.7331 15.3972 9.83729C15.293 9.94147 15.1517 10 15.0043 10H10.5587C10.4113 10 10.2699 9.94147 10.1657 9.83729C10.0615 9.7331 10.003 9.5918 10.003 9.44446C10.003 9.29712 10.0615 9.15582 10.1657 9.05164C10.2699 8.94745 10.4113 8.88892 10.5587 8.88892H13.663L8.33586 3.56339L5.9505 5.94874C5.89889 6.00039 5.8376 6.04136 5.77014 6.06932C5.70268 6.09728 5.63037 6.11167 5.55734 6.11167C5.48431 6.11167 5.412 6.09728 5.34454 6.06932C5.27708 6.04136 5.21579 6.00039 5.16418 5.94874L0.162852 0.948891C0.0585797 0.844649 -1.55378e-09 0.703267 0 0.555847C1.55378e-09 0.408427 0.0585797 0.267045 0.162852 0.162804C0.267125 0.0585623 0.408549 1.55332e-09 0.556012 0C0.703476 -1.55332e-09 0.8449 0.0585623 0.949172 0.162804L5.55734 4.7703L7.9427 2.38496C7.99431 2.33331 8.05559 2.29233 8.12306 2.26437C8.19052 2.23642 8.26283 2.22203 8.33586 2.22203C8.40889 2.22203 8.4812 2.23642 8.54866 2.26437C8.61612 2.29233 8.67741 2.33331 8.72902 2.38496L14.4486 8.10353V5.00015C14.4486 4.85282 14.5071 4.71151 14.6114 4.60733C14.7156 4.50315 14.8569 4.44462 15.0043 4.44462C15.1517 4.44462 15.293 4.50315 15.3972 4.60733C15.5015 4.71151 15.56 4.85282 15.56 5.00015Z" fill="#EC817D"/>
                      </svg>
                      <span className="text-xs text-red">-5%</span>
                    </div>
                  </div>
                  <div className="mt-4 text-text-200">Axis Flexi Cap Fund</div>
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
                <PerformanceMetrics />
              </TabsContent>

              <TabsContent value="composition">
                <PortfolioComposition />
              </TabsContent>
            </Tabs>
          </main>
        </div>
        </div>
      </div>
  )
}