import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronDown, 
  Search, 
  ThumbsUp, 
  ThumbsDown, 
  Settings, 
  Database, 
  Shield, 
  DollarSign, 
  ArrowRight,
  Package,
  Globe
} from "lucide-react";

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
  helpful: number;
  unhelpful: number;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    category: "Compliance",
    question: "What does the AI Compliance Rate mean?",
    answer: "The AI Compliance Rate represents the percentage of your shipments that align with current regulatory requirements based on our machine learning model. A score of 93.7% means 93.7% of your classified shipments meet compliance standards.",
    helpful: 124,
    unhelpful: 8,
  },
  {
    id: 2,
    category: "Tariff Calculation",
    question: "How is the estimated duty calculated?",
    answer: "Estimated duty is calculated based on the HS code classification, product value, origin country, and applicable trade agreements. Our system analyzes the product specifications you provide against the Harmonized System database.",
    helpful: 89,
    unhelpful: 5,
  },
  {
    id: 3,
    category: "FTA Eligibility",
    question: "What trade agreements does AITradeX support?",
    answer: "AITradeX supports major trade agreements including ASEAN Free Trade Area (AFTA), CPTPP, and bilateral agreements. Our system automatically identifies applicable agreements based on origin and destination countries.",
    helpful: 156,
    unhelpful: 12,
  },
  {
    id: 4,
    category: "AI Classification",
    question: "How often is regulatory data updated?",
    answer: "Our regulatory database is updated daily to reflect changes in tariff rates, HS code classifications, and trade agreement terms. The Live Regulation Tracker shows real-time compliance scores.",
    helpful: 201,
    unhelpful: 15,
  },
  {
    id: 5,
    category: "Shipment Upload",
    question: "How is my shipment data protected?",
    answer: "All shipment data is encrypted in transit and at rest using industry-standard protocols. We comply with international data protection regulations and maintain strict access controls.",
    helpful: 178,
    unhelpful: 3,
  },
  {
    id: 6,
    category: "ERP Integration",
    question: "Can I integrate AITradeX with my existing systems?",
    answer: "Yes! AITradeX provides API endpoints for integration with ERP, logistics, and customs systems. Our technical team can assist with custom integrations. Contact support@aitradex.com for assistance.",
    helpful: 92,
    unhelpful: 6,
  },
];

export default function QA() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, boolean>>({});

  // Dynamic engine to catch queries across all strings live
  const filteredFAQ = faqData.filter((item) => {
    const cleanQuery = searchQuery.trim().toLowerCase();
    
    const matchesSearch =
      cleanQuery === "" ||
      item.question.toLowerCase().includes(cleanQuery) ||
      item.answer.toLowerCase().includes(cleanQuery) ||
      item.category.toLowerCase().includes(cleanQuery);
    
    const matchesTopic = !activeTopic || item.category === activeTopic;

    return matchesSearch && matchesTopic;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 px-4">
      {/* Header text content */}
      <div className="text-center space-y-2 max-w-2xl mx-auto mt-4">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Knowledge Base & Support
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Search clear documentation, look up trade workflows, or select a popular category shortcut below to troubleshoot issues instantly.
        </p>
      </div>

      {/* ================= DYNAMIC SEARCH ELEMENT ================= */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions, answers, or keywords..."
          className="h-12 pl-12 pr-4 text-sm bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus-visible:ring-blue-600 rounded-xl shadow-sm w-full block"
        />
      </div>

      {/* Topics Filters Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase">Popular Topics</h2>
          {(activeTopic || searchQuery) && (
            <button 
              onClick={() => {
                setActiveTopic(null);
                setSearchQuery("");
              }} 
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: "Shipment Upload", icon: Package, color: "text-blue-600 bg-blue-50 border-blue-100" },
            { name: "AI Classification", icon: Database, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
            { name: "FTA Eligibility", icon: Globe, color: "text-teal-600 bg-teal-50 border-teal-100" },
            { name: "Tariff Calculation", icon: DollarSign, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
            { name: "Compliance", icon: Shield, color: "text-amber-600 bg-amber-50 border-amber-100" },
            { name: "ERP Integration", icon: Settings, color: "text-orange-600 bg-orange-50 border-orange-100" },
          ].map((topic) => {
            const Icon = topic.icon;
            const isSelected = activeTopic === topic.name;
            return (
              <Card 
                key={topic.name} 
                onClick={() => setActiveTopic(isSelected ? null : topic.name)}
                className={`hover:shadow-md transition-all duration-150 cursor-pointer border ${
                  isSelected ? "ring-2 ring-blue-600 border-transparent shadow-sm bg-slate-50/50" : "border-slate-200 bg-white"
                }`}
              >
                <CardContent className="p-4 flex flex-col items-center text-center justify-center h-full">
                  <div className={`p-2.5 rounded-xl mb-2.5 border ${topic.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-xs text-slate-700 leading-tight">
                    {topic.name}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Dynamic Results Rendering Panel */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {activeTopic ? `${activeTopic} Entries` : "Frequently Asked Questions"}
          </h2>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            {filteredFAQ.length} {filteredFAQ.length === 1 ? "Result" : "Results"}
          </span>
        </div>

        <div className="space-y-2.5">
          {filteredFAQ.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <Card key={item.id} className="border-slate-200 shadow-sm overflow-hidden transition-all duration-150">
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="cursor-pointer p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex-1 space-y-1.5">
                    <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200 text-[10px] font-semibold uppercase tracking-wider px-2 py-0">
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-sm sm:text-base text-slate-900 pr-4">{item.question}</h3>
                  </div>
                  <div className={`p-1 rounded-md bg-slate-100 text-slate-400 transition-transform ${isExpanded ? "rotate-180 text-slate-600" : ""}`}>
                    <ChevronDown className="w-4 h-4 flex-shrink-0" />
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-slate-100 p-5 bg-slate-50/40 space-y-4">
                    <p className="text-slate-600 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Empty Fallback State */}
        {filteredFAQ.length === 0 && (
          <Card className="border-dashed border-2 border-slate-200 bg-transparent">
            <CardContent className="py-12 text-center max-w-sm mx-auto space-y-3">
              <p className="font-semibold text-slate-800 text-sm">No results match your search</p>
              <p className="text-xs text-slate-400">Try modifying your query text parameters to start fresh.</p>
              <Button size="sm" variant="outline" onClick={() => { setSearchQuery(""); setActiveTopic(null); }}>
                Reset Search Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}