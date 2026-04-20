import Image from 'next/image'

export default function Logo({ className }: { className?: string }) {
  return (
    <Image 
      src="/barakah-connect-logo.jpg" 
      alt="Barakah Connect" 
      width={400} 
      height={400} 
      className={`${className} mix-blend-multiply object-contain`} 
      priority
    />
  )
}
