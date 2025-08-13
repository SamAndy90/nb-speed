"use client"

import { useState, useRef, type ChangeEvent, type DragEvent } from "react"
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"



type imageUploadProps = {
  setFile: (file: File | null) => void
  setFileError: (error: string | null) => void
  fileError: string | null
  file: File | null
}



export default function ImageUpload({ setFile, setFileError, fileError, file }: imageUploadProps ) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (file: File) => {
    setFileError("")

    // Define acceptable file types
    const acceptableImageTypes = ['image/jpeg', 'image/png'];
    const acceptablePdfType = 'application/pdf';
    
    if (acceptableImageTypes.includes(file.type) || file.type === acceptablePdfType) {
        setFile(file);    
        // Create preview URL
        const reader = new FileReader()
        reader.onload = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    } else {
        setFileError('Please upload a valid file (PDF, PNG or JPG)');
        return;
    }


  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <>
      <Label htmlFor="receipt">Upload Receipt</Label>
      <div className="w-full mx-auto">
        
          {!file ? (
            <div
              className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                isDragging ? "border-primary bg-primary/5" : "border-gray-300 dark:border-gray-700 hover:border-gray-400"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
            >
              <div className="flex flex-col items-center justify-center space-y-3 text-center cursor-pointer">
                <UploadCloudIcon className="h-10 w-10 text-gray-400" />
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or PDF</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex items-start space-x-4">
                {preview ? (
                  <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <FileIcon className="h-8 w-8 text-gray-400" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile()
                      }}
                    >
                      <XIcon className="h-4 w-4" />
                      <span className="sr-only">Remove file</span>
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{formatFileSize(file.size)}</p>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">Ready to upload</p>
                </div>
              </div>
            </div>
          )}

          {fileError && <p className="text-sm text-red-500 mt-2">{fileError}</p>}

          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      </div>
    </>

  )
}
