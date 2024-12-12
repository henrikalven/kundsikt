import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Velkommen til Kunsikt</h1>
      <p className="mb-4">Kunsikt er en plattform for forretningsanalyse og strategisk planlegging.</p>
      <Link href="/prosjekt" passHref>
        <Button>Se alle prosjekter</Button>
      </Link>
    </div>
  )
}

