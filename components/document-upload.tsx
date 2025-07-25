"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, Link, CheckCircle, File, X } from "lucide-react"

interface DocumentUploadProps {
  onDocumentReady: (url: string, file?: File) => void
}

export function DocumentUpload({ onDocumentReady }: DocumentUploadProps) {
  const [documentUrl, setDocumentUrl] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isValidUrl, setIsValidUrl] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUrlChange = (url: string) => {
    setDocumentUrl(url)
    const isValid = url.startsWith("http") && (url.includes(".pdf") || url.includes(".docx") || url.includes("blob"))
    setIsValidUrl(isValid)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
      if (validTypes.includes(file.type)) {
        setUploadedFile(file)
        // Create a blob URL for the uploaded file
        const blobUrl = URL.createObjectURL(file)
        setDocumentUrl(blobUrl)
      } else {
        alert("Please upload a PDF or DOCX file only.")
      }
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    setDocumentUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleContinue = () => {
    if (uploadMethod === "url" && isValidUrl) {
      onDocumentReady(documentUrl)
    } else if (uploadMethod === "file" && uploadedFile) {
      onDocumentReady(documentUrl, uploadedFile)
    }
  }

  const sampleUrl =
    "https://hackrx.blob.core.windows.net/assets/policy.pdf?sv=2023-01-03&st=2025-07-04T09%3A11%3A24Z&se=2027-07-05T09%3A11%3A00Z&sr=b&sp=r&sig=N4a9OU0w0QXO6AOIBiu4bpl7AXvEZogeT%2FjUHNO7HzQ%3D"

  const canContinue = (uploadMethod === "url" && isValidUrl) || (uploadMethod === "file" && uploadedFile)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2 text-blue-600" />
            Document Upload
          </CardTitle>
          <CardDescription>
            Upload your documents for AI-powered analysis. Supports PDF, DOCX, and email formats.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={uploadMethod} onValueChange={(value) => setUploadMethod(value as "url" | "file")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url" className="flex items-center space-x-2">
                <Link className="w-4 h-4" />
                <span>URL Upload</span>
              </TabsTrigger>
              <TabsTrigger value="file" className="flex items-center space-x-2">
                <File className="w-4 h-4" />
                <span>File Upload</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="document-url">Document URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="document-url"
                    placeholder="Enter document URL (PDF, DOCX, or blob URL)"
                    value={documentUrl}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="flex-1"
                  />
                  {isValidUrl && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Sample Document</h4>
                <p className="text-sm text-blue-700 mb-3">Try our system with this sample insurance policy document:</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUrlChange(sampleUrl)}
                  className="text-blue-600 border-blue-300 hover:bg-blue-100"
                >
                  <Link className="w-4 h-4 mr-2" />
                  Load Sample Policy
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="file" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file-upload">Upload Document</Label>
                {!uploadedFile ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <input
                      ref={fileInputRef}
                      id="file-upload"
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">Drop your file here or click to browse</p>
                    <p className="text-sm text-gray-500 mb-4">Supports PDF and DOCX files up to 10MB</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 border-blue-300 hover:bg-blue-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                ) : (
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="font-medium text-green-800">{uploadedFile.name}</p>
                          <p className="text-sm text-green-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={removeFile} className="text-red-600 hover:bg-red-50">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-8 h-8 text-red-500" />
              <div>
                <p className="font-medium">PDF Documents</p>
                <p className="text-sm text-gray-600">Policy documents, contracts</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-8 h-8 text-blue-500" />
              <div>
                <p className="font-medium">DOCX Files</p>
                <p className="text-sm text-gray-600">Legal documents, reports</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <FileText className="w-8 h-8 text-green-500" />
              <div>
                <p className="font-medium">Email Content</p>
                <p className="text-sm text-gray-600">Correspondence, attachments</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="flex space-x-2">
              <Badge variant="secondary">Insurance</Badge>
              <Badge variant="secondary">Legal</Badge>
              <Badge variant="secondary">HR</Badge>
              <Badge variant="secondary">Compliance</Badge>
            </div>
            <Button onClick={handleContinue} disabled={!canContinue} className="bg-blue-600 hover:bg-blue-700">
              Continue to Query
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
