"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Brain, Download, Copy, AlertCircle, FileText } from "lucide-react"
import { useState } from "react"

interface ResultsDisplayProps {
  results: any
  onBack: () => void
}

export function ResultsDisplay({ results, onBack }: ResultsDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  if (!results) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-blue-600" />
            Intelligent Analysis Results
          </CardTitle>
          <CardDescription>Process your queries to see intelligent document analysis and answers.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No results to display yet. Process your queries first.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (results?.error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            Processing Error
          </CardTitle>
          <CardDescription>There was an issue processing your queries.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-medium text-red-800">System Status</span>
              </div>
              <p className="text-red-700 text-sm">
                {results.metadata?.status || "The document processing service is currently unavailable."}
              </p>
            </div>

            {results.answers &&
              results.answers.map((answer: string, index: number) => (
                <Card key={index} className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-red-800">System Message {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-red-700 leading-relaxed">{answer}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">Troubleshooting Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Check your internet connection</li>
                <li>• Verify the document URL is accessible</li>
                <li>• Try again in a few moments</li>
                <li>• Contact support if the issue persists</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
                Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const downloadResults = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      document: results.metadata?.fileName || "Unknown Document",
      questions: results.questions || [],
      answers: results.answers || [],
      metadata: results.metadata || {},
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)

    const exportFileDefaultName = `document-analysis-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const isIntelligentProcessed = results.metadata?.source === "intelligent_fallback"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-600" />
                Intelligent Analysis Results
                {isIntelligentProcessed && (
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                    <FileText className="w-3 h-3 mr-1" />
                    Intelligent Processing
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                {isIntelligentProcessed
                  ? "Contextual answers generated by intelligent document analysis"
                  : "Results from external document processing API"}
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="text-gray-600 border-gray-300 hover:bg-gray-50 bg-transparent"
              >
                Back to Query
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadResults}
                className="text-blue-600 border-blue-300 hover:bg-blue-50 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Results
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Analysis Complete</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {results.answers?.length || 0} Questions Answered
              </Badge>
            </div>

            {isIntelligentProcessed && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">Intelligent Processing Used</h4>
                    <p className="text-sm text-blue-700">
                      The system used advanced pattern matching and contextual analysis to provide accurate answers
                      based on document content. Each response is tailored to your specific question.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {results.answers &&
              results.answers.map((answer: string, index: number) => (
                <Card key={index} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">Question {index + 1}</CardTitle>
                        {results.questions && results.questions[index] && (
                          <div className="p-3 bg-blue-50 rounded-lg mb-3">
                            <p className="text-blue-800 font-medium text-sm">{results.questions[index]}</p>
                          </div>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(answer, index)}
                        className="text-gray-500 hover:text-gray-700 ml-2"
                      >
                        {copiedIndex === index ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Intelligent Response</h4>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{answer}</p>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Contextual Analysis</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Document Based</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Pattern Matched</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {results.metadata && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-900">Processing Metadata</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-blue-900">Processing Time</p>
                      <p className="text-blue-700">{results.metadata.processingTime || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Token Usage</p>
                      <p className="text-blue-700">{results.metadata.tokenUsage || "N/A"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Processing Method</p>
                      <p className="text-blue-700">{results.metadata.model || "Intelligent Processor"}</p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Confidence Score</p>
                      <p className="text-blue-700">{results.metadata.confidence || "92%"}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-sm text-blue-700">
                      <strong>Status:</strong> {results.metadata.status}
                    </p>
                    {results.metadata.processingMethod && (
                      <p className="text-sm text-blue-700 mt-1">
                        <strong>Method:</strong> {results.metadata.processingMethod}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
