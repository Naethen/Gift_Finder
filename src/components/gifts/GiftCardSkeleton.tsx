import { motion } from 'framer-motion';

export default function GiftCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image Skeleton */}
      <motion.div
        animate={{
          background: [
            'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)',
            'linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)',
          ],
          backgroundPosition: ['0% 0%', '100% 0%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="aspect-square"
      />

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)',
              'linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)',
            ],
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.2,
          }}
          className="h-6 w-3/4 rounded-md mb-2"
        />

        {/* Description */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)',
              'linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)',
            ],
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.4,
          }}
          className="h-4 w-full rounded-md mb-1"
        />
        <motion.div
          animate={{
            background: [
              'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)',
              'linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)',
            ],
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.6,
          }}
          className="h-4 w-2/3 rounded-md mb-4"
        />

        {/* Tags */}
        <div className="flex gap-2 mb-4">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                background: [
                  'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)',
                  'linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)',
                ],
                backgroundPosition: ['0% 0%', '100% 0%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                delay: 0.8 + i * 0.2,
              }}
              className="h-6 w-16 rounded-full"
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <motion.div
            animate={{
              background: [
                'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)',
                'linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)',
              ],
              backgroundPosition: ['0% 0%', '100% 0%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: 1,
            }}
            className="h-8 w-8 rounded-full"
          />
          <motion.div
            animate={{
              background: [
                'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)',
                'linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)',
              ],
              backgroundPosition: ['0% 0%', '100% 0%'],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
              delay: 1.2,
            }}
            className="h-10 w-24 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
