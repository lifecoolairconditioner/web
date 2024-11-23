'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Field {
  name: string
  label: string
  type: 'text' | 'textarea' | 'file'
}

interface CMSFormProps {
  fields: Field[]
  onSubmit: (data: FormData) => Promise<void>
  initialData?: Record<string, string>
}

export default function CMSForm({ fields, onSubmit, initialData = {} }: CMSFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    await onSubmit(formData)
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
            <Textarea
              id={field.name}
              name={field.name}
              defaultValue={initialData[field.name] || ''}
              className="mt-1 block w-full"
              rows={3}
            />
          ) : field.type === 'file' ? (
            <Input
              type="file"
              id={field.name}
              name={field.name}
              className="mt-1 block w-full"
            />
          ) : (
            <Input
              type="text"
              id={field.name}
              name={field.name}
              defaultValue={initialData[field.name] || ''}
              className="mt-1 block w-full"
            />
          )}
        </div>
      ))}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  )
}

