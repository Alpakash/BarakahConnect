import Image from 'next/image'

export default function Logo({ className }: { className?: string }) {
  return (
    <Image 
      src="/barakah-connect.svg" 
      alt="Barakah Connect" 
      width={400} 
      height={400} 
      className={`${className} object-contain`} 
      priority
    />
  )
}
