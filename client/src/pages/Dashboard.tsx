import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Scale, 
  Clock, 
  FileText, 
  SlidersHorizontal,
  ExternalLink
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Original enhanced dataset preserved completely
const tariffDataset = [
  { month: "Jan", country: "China", category: "Electronics", unit: "Operations", cost: 18000, duty: 1260 },
  { month: "Jan", country: "China", category: "Textiles", unit: "Supply Chain", cost: 10000, duty: 660 },
  { month: "Jan", country: "Japan", category: "Electronics", unit: "Operations", cost: 8000, duty: 560 },
  { month: "Jan", country: "Japan", category: "Machinery", unit: "Manufacturing", cost: 4000, duty: 280 },
  { month: "Jan", country: "Vietnam", category: "Textiles", unit: "Supply Chain", cost: 5000, duty: 440 },
  
  { month: "Feb", country: "China", category: "Electronics", unit: "Operations", cost: 20000, duty: 1400 },
  { month: "Feb", country: "China", category: "Textiles", unit: "Supply Chain", cost: 11000, duty: 770 },
  { month: "Feb", country: "Japan", category: "Electronics", unit: "Operations", cost: 10000, duty: 700 },
  { month: "Feb", country: "Japan", category: "Machinery", unit: "Manufacturing", cost: 5000, duty: 350 },
  { month: "Feb", country: "Vietnam", category: "Textiles", unit: "Supply Chain", cost: 6000, duty: 540 },
  
  { month: "Mar", country: "China", category: "Electronics", unit: "Operations", cost: 17000, duty: 1190 },
  { month: "Mar", country: "China", category: "Textiles", unit: "Supply Chain", cost: 12000, duty: 840 },
  { month: "Mar", country: "Japan", category: "Electronics", unit: "Operations", cost: 9000, duty: 630 },
  { month: "Mar", country: "Japan", category: "Machinery", unit: "Manufacturing", cost: 5000, duty: 350 },
  { month: "Mar", country: "Vietnam", category: "Textiles", unit: "Supply Chain", cost: 5000, duty: 440 },
  
  { month: "Apr", country: "China", category: "Electronics", unit: "Operations", cost: 22000, duty: 1540 },
  { month: "Apr", country: "China", category: "Textiles", unit: "Supply Chain", cost: 15000, duty: 1050 },
  { month: "Apr", country: "Japan", category: "Electronics", unit: "Operations", cost: 10000, duty: 700 },
  { month: "Apr", country: "Japan", category: "Machinery", unit: "Manufacturing", cost: 6000, duty: 420 },
  { month: "Apr", country: "Vietnam", category: "Textiles", unit: "Supply Chain", cost: 8000, duty: 720 },
  
  { month: "May", country: "China", category: "Electronics", unit: "Operations", cost: 20000, duty: 1400 },
  { month: "May", country: "China", category: "Textiles", unit: "Supply Chain", cost: 13000, duty: 910 },
  { month: "May", stroke: "Japan", category: "Electronics", unit: "Operations", cost: 9000, duty: 630 },
  { month: "May", country: "Japan", category: "Machinery", unit: "Manufacturing", cost: 6000, duty: 420 },
  { month: "May", country: "Vietnam", category: "Textiles", unit: "Supply Chain", cost: 7000, duty: 630 },
  
  { month: "Jun", country: "China", category: "Electronics", unit: "Operations", cost: 24000, duty: 1680 },
  { month: "Jun", country: "China", category: "Textiles", unit: "Supply Chain", cost: 16000, duty: 1120 },
  { month: "Jun", country: "Japan", category: "Electronics", unit: "Operations", cost: 11000, duty: 770 },
  { month: "Jun", country: "Japan", category: "Machinery", unit: "Manufacturing", cost: 7000, duty: 490 },
  { month: "Jun", country: "Vietnam", category: "Textiles", unit: "Supply Chain", cost: 9000, duty: 810 },
];

const recentActivity = [
  { id: "JPN-1006", product: "SUPPRESSOR VOLTAGE SMD 30V 1.2J", value: "5,000", compliance: "98%", status: "Approved" },
  { id: "JPN-1007", product: "BTIO-BTI-SMJ-BM4T2-15 Monitor Touch", value: "25,000", compliance: "98%", status: "Approved" },
  { id: "JPN-1008", product: "Industrial Temperature Sensor", value: "8,500", compliance: "92%", status: "Approved" },
];

export default function Dashboard() {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUnit, setSelectedUnit] = useState("all");

  // Aggregate data by month based on filters
  const filteredChartData = useMemo(() => {
    const monthlyData: Record<string, { month: string; cost: number; duty: number }> = {};

    tariffDataset.forEach((item) => {
      const countryMatch = selectedCountry === "all" || item.country === selectedCountry;
      const categoryMatch = selectedCategory === "all" || item.category === selectedCategory;
      const unitMatch = selectedUnit === "all" || item.unit === selectedUnit;

      if (countryMatch && categoryMatch && unitMatch) {
        if (!monthlyData[item.month]) {
          monthlyData[item.month] = { month: item.month, cost: 0, duty: 0 };
        }
        monthlyData[item.month].cost += item.cost;
        monthlyData[item.month].duty += item.duty;
      }
    });

    return Object.values(monthlyData).sort((a, b) => {
      const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });
  }, [selectedCountry, selectedCategory, selectedUnit]);

  const hasData = filteredChartData.length > 0;

  return (
    <div className="space-y-3.5 max-w-[1600px] mx-auto p-1 text-slate-900">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 border-b border-slate-100 gap-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Good Day, Ahmad</h1>
          <p className="text-xs text-slate-500">You have <span className="font-semibold text-blue-600">5 shipments</span> pending administrative review markers.</p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-50 border border-slate-200/60 rounded-md px-2 py-1 h-fit self-end sm:self-auto">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Core Timezone: <strong className="text-slate-600">MYT (UTC+8)</strong></span>
        </div>
      </div>

      {/* ================= NEW FEATURE: LIVE REGULATION TRACKER ================= */}
      <Card className="border-amber-200 bg-amber-50/20 shadow-sm overflow-hidden">
        <div className="px-3.5 py-2.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-amber-500/10 rounded-lg border border-amber-200/50 mt-0.5 shrink-0">
              <Scale className="w-4 h-4 text-amber-600" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center flex-wrap gap-1.5">
                <span className="text-xs font-bold text-slate-900">Live Regulation Tracker</span>
                <Badge className="bg-rose-50 text-rose-700 border-rose-200 text-[10px] font-medium py-0 px-1.5">
                  Action Required
                </Badge>
              </div>
              <p className="text-xs text-slate-600 leading-normal">
                <strong className="text-slate-800">Customs Directive 10-26:</strong> Revised verification requirements introduced for regional cross-border electrical elements. Entries must specify structured compliance paths before end of ledger cycles.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto pt-1 md:pt-0">
            <Button variant="ghost" size="sm" className="h-7 text-[11px] text-slate-500 hover:text-slate-800 px-2 font-semibold">
              Dismiss
            </Button>
            <Button size="sm" className="h-7 text-[11px] bg-slate-900 text-white hover:bg-slate-800 font-medium px-3 flex items-center gap-1">
              <FileText className="w-3 h-3" /> View Gazette <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* ================= FOUR STAT CARDS ROW ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border-slate-200/80 shadow-sm bg-white">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Shipments This Month</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">148</span>
            <div className="flex items-center gap-0.5 text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-md px-1 py-0.5 text-[10px] font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>+12%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm bg-white">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Pending Review</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">5</span>
            <Badge className="bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-50 text-[10px] font-medium py-0 px-1.5">
              Pending
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm bg-white">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">AI Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">93.7%</span>
            <div className="flex items-center gap-0.5 text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-md px-1 py-0.5 text-[10px] font-medium">
              <TrendingUp className="w-3 h-3" />
              <span>+2.1%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm bg-white">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Est. Duty Liability</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">RM 18.4K</span>
            <div className="flex items-center gap-0.5 text-rose-600 bg-rose-50 border border-rose-100 rounded-md px-1 py-0.5 text-[10px] font-medium">
              <TrendingDown className="w-3 h-3" />
              <span>-3.2%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= ANALYTICS & BREAKDOWN ROW ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        
        {/* Interactive Chart Core Card */}
        <Card className="border-slate-200/80 lg:col-span-2 bg-white shadow-sm flex flex-col justify-between">
          <CardHeader className="p-3.5 pb-1.5 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle className="text-sm font-bold text-slate-900">Tariff Cost Analytics</CardTitle>
                <CardDescription className="text-[11px] text-slate-400">Monthly spend parameters summary — Jan - Jun 2026</CardDescription>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded h-fit">
                <SlidersHorizontal className="w-2.5 h-2.5 text-slate-400" />
                <span>Filters Active</span>
              </div>
            </div>

            {/* Tight-fit filter items configuration */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[115px] h-7 text-[11px] bg-white border-slate-200 text-slate-700 font-medium px-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="China">China</SelectItem>
                  <SelectItem value="Japan">Japan</SelectItem>
                  <SelectItem value="Vietnam">Vietnam</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[130px] h-7 text-[11px] bg-white border-slate-200 text-slate-700 font-medium px-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Textiles">Textiles</SelectItem>
                  <SelectItem value="Machinery">Machinery</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedUnit} onValueChange={setSelectedUnit}>
                <SelectTrigger className="w-[130px] h-7 text-[11px] bg-white border-slate-200 text-slate-700 font-medium px-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Units</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Supply Chain">Supply Chain</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <CardContent className="p-3.5 pt-1">
            {hasData ? (
              <ResponsiveContainer width="100%" height={165}>
                <AreaChart data={filteredChartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} style={{ fontSize: "10px" }} />
                  <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#0f172a", 
                      border: "none", 
                      borderRadius: "8px", 
                      color: "#f8fafc", 
                      fontSize: "11px",
                      padding: "6px 10px"
                    }} 
                  />
                  <Area type="monotone" dataKey="cost" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[165px] flex items-center justify-center border border-dashed border-slate-100 rounded-xl bg-slate-50/50">
                <div className="text-center max-w-xs">
                  <AlertCircle className="w-5 h-5 mx-auto mb-1 text-slate-300" />
                  <p className="text-xs font-semibold text-slate-700">No chart results match selections</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Duty Breakdown Allocation Card */}
        <Card className="border-slate-200/80 bg-white shadow-sm flex flex-col justify-between">
          <CardHeader className="p-3.5 pb-1">
            <CardTitle className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Duty Breakdown</CardTitle>
            <CardDescription className="text-[11px] text-slate-400">Total operational breakdown layout</CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 pt-2 space-y-2.5 flex-1 flex flex-col justify-center">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-xs text-slate-600">Direct Entry Tariffs</span>
              </div>
              <span className="text-xs font-bold text-slate-900">RM 12,500</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-xs text-slate-600">Regulatory Surcharges</span>
              </div>
              <span className="text-xs font-bold text-slate-900">RM 5,900</span>
            </div>
            <div className="pt-0.5">
              <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg p-2">
                <span className="text-xs font-semibold text-slate-700">Aggregate Total</span>
                <span className="text-xs font-extrabold text-blue-600">RM 18,400</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= DATA LEDGER TABLE ================= */}
      <Card className="border-slate-200/80 bg-white shadow-sm">
        <CardHeader className="p-3.5 pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-sm font-bold text-slate-900">Recent Shipments Log</CardTitle>
            <CardDescription className="text-[11px] text-slate-400">Latest automated classifications ledger entries</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-7 text-[11px] px-2.5 border-slate-200 text-slate-700 font-semibold hover:bg-slate-50">
            View Complete Ledger →
          </Button>
        </CardHeader>
        <CardContent className="p-3.5 pt-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  <th className="pb-2 font-bold">Shipment ID</th>
                  <th className="pb-2 font-bold">Product Specifications</th>
                  <th className="pb-2 font-bold text-right">Value</th>
                  <th className="pb-2 font-bold pl-5">Compliance Fit</th>
                  <th className="pb-2 font-bold text-right">Audit State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {recentActivity.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-2.5 font-mono font-bold text-blue-600">{item.id}</td>
                    <td className="py-2.5 text-slate-600 max-w-[340px] truncate pr-4">{item.product}</td>
                    <td className="py-2.5 text-slate-900 font-bold text-right">RM {item.value}</td>
                    <td className="py-2.5 pl-5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: item.compliance }} />
                        </div>
                        <span className="font-bold text-slate-700 text-[10px]">{item.compliance}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right">
                      <Badge className="bg-emerald-50 text-emerald-800 border-emerald-200/60 hover:bg-emerald-50 font-medium text-[10px] px-2 py-0">
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ================= INFRASTRUCTURE HEALTH STATUS FOOTER ================= */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <div>
              <p className="text-[11px] font-bold text-slate-800 leading-none">JKDM API Node</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Live sync streaming operational</p>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-x border-slate-200/60 pt-1.5 sm:pt-0 sm:px-4">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <div>
              <p className="text-[11px] font-bold text-slate-800 leading-none">Regulation Synchronization Feed</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Updated 2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t sm:border-t-0 pt-1.5 sm:pt-0 sm:pl-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <div>
              <p className="text-[11px] font-bold text-slate-800 leading-none">AI Custom Engine</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Validation cycles active</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}