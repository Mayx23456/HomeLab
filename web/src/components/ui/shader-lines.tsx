'use client'

import type React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type ShaderAnimationProps = React.ComponentProps<'div'> & {
  primary?: string
  secondary?: string
}

export function ShaderAnimation({
  primary = '#00ff87',
  secondary = '#00c8ff',
  className,
  ...props
}: ShaderAnimationProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)} {...props}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(145deg,#04060d_0%,#09101a_48%,#02040a_100%)]" />

      <motion.div
        className="absolute inset-[-24%] opacity-80"
        style={{
          backgroundImage: [
            `radial-gradient(circle at 20% 20%, ${primary}18, transparent 24%)`,
            `radial-gradient(circle at 78% 22%, ${secondary}20, transparent 22%)`,
            `repeating-linear-gradient(115deg, transparent 0 18px, rgba(255,255,255,0.03) 18px 19px, transparent 19px 42px)`,
            `repeating-linear-gradient(0deg, transparent 0 10px, rgba(0, 200, 255, 0.07) 10px 11px, transparent 11px 22px)`,
          ].join(', '),
        }}
        animate={{
          x: ['-6%', '4%', '-3%', '-6%'],
          y: ['-4%', '3%', '0%', '-4%'],
          rotate: [0, 1.5, -1, 0],
          scale: [1, 1.05, 1.02, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute inset-0 mix-blend-screen opacity-80"
        style={{
          backgroundImage: [
            `linear-gradient(90deg, transparent 0%, ${primary}00 15%, ${primary}22 36%, ${secondary}14 58%, transparent 78%)`,
            `repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 20px)`,
          ].join(', '),
        }}
        animate={{
          backgroundPosition: ['0% 0%, 0px 0px', '100% 0%, 180px 0px'],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_20%,transparent_80%,rgba(0,0,0,0.5)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_58%,rgba(10,10,15,0.88)_100%)]" />
    </div>
  )
}
