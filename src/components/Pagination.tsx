'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number
  totalPages: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-12">

      {/* Prev button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 px-4 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Prev
      </button>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`h-9 w-9 text-sm rounded-lg border ${
            page === currentPage
              ? 'bg-blue-500 text-white border-blue-500'
              : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 px-4 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next →
      </button>

    </div>
  )
}