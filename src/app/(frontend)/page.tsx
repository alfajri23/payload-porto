import { PixelImage } from '@/components/ui/pixel-image'
import PageTemplate, { generateMetadata } from './[slug]/page'
import Image from 'next/image'
import { ParallaxHeroImages } from '@/components/ui/parallax-hero-images'
import { BellIcon, CalendarIcon, FileTextIcon, Share2Icon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid'

export { generateMetadata }

const images = [
  'https://assets.aceternity.com/components/hero-section-with-mesh-gradient.webp',
  'https://assets.aceternity.com/components/3d-globe.webp',
  'https://assets.aceternity.com/components/keyboard-2.webp',
  'https://assets.aceternity.com/components/hero-1.webp',
  // 'https://assets.aceternity.com/components/hero-2.webp',
  // 'https://assets.aceternity.com/components/hero-3.webp',
]

const files = [
  {
    name: 'bitcoin.pdf',
    body: 'Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.',
  },
  {
    name: 'finances.xlsx',
    body: 'A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.',
  },
  {
    name: 'logo.svg',
    body: 'Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.',
  },
  {
    name: 'keys.gpg',
    body: 'GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.',
  },
  {
    name: 'seed.txt',
    body: 'A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.',
  },
]

const features = [
  {
    Icon: FileTextIcon,
    name: 'Save your files',
    description: 'We automatically save your files as you type.',
    href: '#',
    cta: 'Learn more',
    className: 'col-span-3 lg:col-span-1',
    background: <img alt="" className="absolute -top-20 -right-20 opacity-60" />,
  },
  {
    Icon: BellIcon,
    name: 'Notifications',
    description: 'Get notified when something happens.',
    href: '#',
    cta: 'Learn more',
    className: 'col-span-3 lg:col-span-2',
    background: <img alt="" className="absolute -top-20 -right-20 opacity-60" />,
  },
  {
    Icon: Share2Icon,
    name: 'Integrations',
    description: 'Supports 100+ integrations and counting.',
    href: '#',
    cta: 'Learn more',
    className: 'col-span-3 lg:col-span-2',
    background: <img alt="" className="absolute -top-20 -right-20 opacity-60" />,
  },
  {
    Icon: CalendarIcon,
    name: 'Calendar',
    description: 'Use the calendar to filter your files by date.',
    className: 'col-span-3 lg:col-span-1',
    href: '#',
    cta: 'Learn more',
    background: <img alt="" className="absolute -top-20 -right-20 opacity-60" />,
  },
]

export default function Page() {
  return (
    <>
      <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-yellow-100 dark:bg-neutral-950">
        <ParallaxHeroImages images={images} />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-800 drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] md:text-6xl dark:text-neutral-100 dark:drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            Everything & Everywhere
          </h1>
          <p className="max-w-md text-neutral-600 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] dark:text-neutral-400 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
            Move your mouse to see the parallax effect. Images at different depths move at different
            speeds.
          </p>
        </div>
      </div>

      <BentoGrid className="max-w-5xl mx-auto mt-10 lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>

      {/* <div className="w-full">
        <Image
          src="https://images.unsplash.com/photo-1454908027598-28c44b1716c1?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="404"
          width={500}
          height={500}
          className="mx-auto my-8"
        />
      </div> */}
    </>
  )
}
