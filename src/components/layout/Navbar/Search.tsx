'use client'

import { SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useState } from 'react'

import { Input } from '@/components/ui/input'

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm) {
      const url = qs.stringifyUrl({
        url: '/search',
        query: { term: searchTerm },
      })

      router.push(url)
    }
  }

  return (
    <div className="flex w-1/3 items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <Input
            placeholder="Search"
            className="h-9 pr-20"
            name="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-2 flex gap-3">
            {searchTerm ? (
              <X
                size={22}
                className="cursor-pointer opacity-60"
                onClick={() => setSearchTerm('')}
              />
            ) : null}
            <button type="submit">
              <SearchIcon size={20} className="cursor-pointer opacity-60" />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Search
