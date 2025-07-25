"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Search, Brain, Zap, Shield, Clock } from "lucide-react"
import Image from "next/image"
import { DocumentUpload } from "@/components/document-upload"
import { QueryInterface } from "@/components/query-interface"
import { ResultsDisplay } from "@/components/results-display"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"upload" | "query" | "results">("upload")
  const [documentUrl, setDocumentUrl] = useState<string>("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [results, setResults] = useState<any>(null)

  const handleDocumentReady = (url: string, file?: File) => {
    setDocumentUrl(url)
    if (file) setUploadedFile(file)
    setActiveTab("query") // Automatically switch to query tab
  }

  const handleQueryResults = (queryResults: any) => {
    setResults(queryResults)
    setActiveTab("results") // Automatically switch to results tab
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/luminax-logo.jpeg"
                alt="LuminaX-Alt"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <div className="h-8 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">In collaboration with</span>
                <Image
                  src="/images/bajaj-finserv-logo.png"
                  alt="Bajaj Finserv"
                  width={80}
                  height={32}
                  className="h-8 w-auto"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Brain className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Shield className="w-3 h-3 mr-1" />
                Enterprise Ready
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Intelligent Document Query & Retrieval System</h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Process large documents and make contextual decisions with AI-powered semantic search for insurance,
              legal, HR, and compliance domains.
            </p>
            <div className="flex justify-center space-x-8 text-sm">
              <div className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                PDF, DOCX, Email Support
              </div>
              <div className="flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Semantic Search
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Real-time Processing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "upload" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Upload className="w-4 h-4 mr-2" />
            Document Upload
          </button>
          <button
            onClick={() => setActiveTab("query")}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "query" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Search className="w-4 h-4 mr-2" />
            Query Interface
          </button>
          <button
            onClick={() => setActiveTab("results")}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "results" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Brain className="w-4 h-4 mr-2" />
            Results & Analysis
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "upload" && <DocumentUpload onDocumentReady={handleDocumentReady} />}

        {activeTab === "query" && (
          <QueryInterface
            documentUrl={documentUrl}
            uploadedFile={uploadedFile}
            onResults={handleQueryResults}
            onBack={() => setActiveTab("upload")}
          />
        )}

        {activeTab === "results" && <ResultsDisplay results={results} onBack={() => setActiveTab("query")} />}
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced AI Capabilities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our system leverages cutting-edge AI technology to provide accurate, fast, and explainable document
              analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Semantic Understanding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Advanced NLP for contextual document comprehension and query interpretation.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Search className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Clause Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Precise clause retrieval with semantic similarity scoring and ranking.</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Real-time Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Optimized for speed with efficient token usage and low latency responses.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-lg">Explainable AI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Clear decision reasoning with clause traceability and confidence scores.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Image src="/images/luminax-logo.jpeg" alt="LuminaX-Alt" width={100} height={32} className="h-8 w-auto" />
              <span className="text-gray-400">×</span>
              <Image
                src="/images/bajaj-finserv-logo.png"
                alt="Bajaj Finserv"
                width={80}
                height={32}
                className="h-8 w-auto"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">© 2024 LuminaX-Alt. Powered by advanced AI technology.</p>
              <p className="text-sm text-gray-500 mt-1">Enterprise-grade document intelligence solutions.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
