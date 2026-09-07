import { Media } from '@/components/Media'
import { Media as MediaInterface } from '@/payload-types'

interface HeroBlockProps {
  badge: string
  title: string
  description: string
  image: number | MediaInterface | null
}

export const HeroBlock: React.FC<HeroBlockProps> = (props) => {
  const { badge, title, description, image } = props

  return (
    <div className="relative bg-gray-100 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            {badge && <p className="text-base font-semibold text-indigo-600">{badge}</p>}
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            {description && <p className="mt-4 text-lg text-gray-500">{description}</p>}
          </div>
          {image && (
            <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6">
              <div className="flex justify-center">
                <Media resource={image} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
