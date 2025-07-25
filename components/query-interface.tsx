"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Search, Brain, Loader2, Plus, X, Zap, FileText } from "lucide-react"

interface QueryInterfaceProps {
  documentUrl: string
  uploadedFile?: File | null
  onResults: (results: any) => void
  onBack: () => void
}

export function QueryInterface({ documentUrl, uploadedFile, onResults, onBack }: QueryInterfaceProps) {
  const [queries, setQueries] = useState<string[]>(["What is the grace period for premium payment under this policy?"])
  const [isProcessing, setIsProcessing] = useState(false)

  const sampleQueries = [
    "What is the waiting period for pre-existing diseases to be covered?",
    "Does this policy cover maternity expenses and what are the conditions?",
    "What is the waiting period for cataract surgery?",
    "Are medical expenses for organ donors covered under this policy?",
    "What No Claim Discount is offered and what is the maximum limit?",
    "Is there a benefit for preventive health check-ups?",
    "How does this policy define a 'Hospital'?",
    "What is the extent of coverage for AYUSH treatments?",
    "What are the sub-limits on room rent and ICU charges?",
    "What are the main exclusions under this policy?",
  ]

  const addQuery = () => {
    setQueries([...queries, ""])
  }

  const updateQuery = (index: number, value: string) => {
    const newQueries = [...queries]
    newQueries[index] = value
    setQueries(newQueries)
  }

  const removeQuery = (index: number) => {
    setQueries(queries.filter((_, i) => i !== index))
  }

  const addSampleQuery = (query: string) => {
    if (!queries.includes(query)) {
      setQueries([...queries, query])
    }
  }

  const clearAllQueries = () => {
    setQueries([""])
  }

  const processQueries = async () => {
    const validQueries = queries.filter((q) => q.trim())
    if (!documentUrl || validQueries.length === 0) return

    setIsProcessing(true)

    try {
      console.log("Sending request to process document with queries:", validQueries)

      const requestBody: any = {
        questions: validQueries,
      }

      // Handle file upload vs URL
      if (uploadedFile) {
        requestBody.documents = documentUrl
        requestBody.isFileUpload = true
        requestBody.fileName = uploadedFile.name
      } else {
        requestBody.documents = documentUrl
      }

      const response = await fetch("/api/process-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const results = await response.json()
      console.log("Processing successful:", results)

      // Add the original questions to the results for display
      results.questions = validQueries

      onResults(results)
    } catch (error) {
      console.error("Error processing queries:", error)

      // Show user-friendly error with fallback
      const fallbackResults = {
        answers: [
          "I apologize, but there was an issue processing your queries. This could be due to network connectivity or the document processing service being temporarily unavailable.",
          "The system is designed to handle insurance, legal, HR, and compliance documents with high accuracy when fully operational.",
          "Please try again in a few moments, or contact support if the issue persists.",
        ],
        questions: queries.filter((q) => q.trim()),
        metadata: {
          processingTime: "N/A",
          tokenUsage: "N/A",
          model: "Error Handler",
          confidence: "N/A",
          source: "error",
          status: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
        },
        success: false,
        error: true,
      }

      onResults(fallbackResults)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2 text-blue-600" />
            Intelligent Document Query Interface
          </CardTitle>
          <CardDescription>
            Ask specific questions about your document. Our intelligent system analyzes the content and provides
            accurate, contextual answers based on the document's information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium text-green-800">Document Ready for Analysis</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    <FileText className="w-3 h-3 mr-1" />
                    Intelligent Processing
                  </Badge>
                </div>
                <p className="text-sm text-green-700">
                  <strong>Document:</strong>{" "}
                  {uploadedFile ? uploadedFile.name : documentUrl.split("/").pop()?.split("?")[0]}
                </p>
                {uploadedFile && (
                  <p className="text-xs text-green-600 mt-1">Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="text-blue-600 border-blue-300 hover:bg-blue-50 bg-transparent"
              >
                Change Document
              </Button>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-start space-x-2">
              <Brain className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 mb-1">Intelligent Processing Active</h4>
                <p className="text-sm text-yellow-700">
                  The system uses advanced pattern matching and document analysis to provide contextual answers. For
                  best results, ask specific questions about policy terms, coverage, waiting periods, and benefits.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Your Questions</h4>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllQueries}
                  className="text-gray-600 border-gray-300 hover:bg-gray-50 bg-transparent"
                >
                  Clear All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addQuery}
                  className="text-blue-600 border-blue-300 hover:bg-blue-50 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </div>

            {queries.map((query, index) => (
              <div key={index} className="flex space-x-2">
                <div className="flex-1">
                  <Textarea
                    placeholder="Ask a specific question about the document content..."
                    value={query}
                    onChange={(e) => updateQuery(index, e.target.value)}
                    className="min-h-[60px] resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Tip: Be specific for better results (e.g., "What is the waiting period for..." instead of "Tell
                    me about waiting periods")
                  </p>
                </div>
                {queries.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeQuery(index)}
                    className="text-red-600 border-red-300 hover:bg-red-50 self-start mt-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Sample Questions</h4>
            <p className="text-sm text-gray-600">Click any question below to add it to your query list:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sampleQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => addSampleQuery(query)}
                  className="text-left justify-start h-auto p-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-200"
                >
                  {query}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Brain className="w-4 h-4" />
                <span>Intelligent analysis</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4" />
                <span>Contextual processing</span>
              </div>
            </div>
            <Button
              onClick={processQueries}
              disabled={isProcessing || !documentUrl || queries.filter((q) => q.trim()).length === 0}
              className="bg-blue-600 hover:bg-blue-700 min-w-[140px]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Analyze Document
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
