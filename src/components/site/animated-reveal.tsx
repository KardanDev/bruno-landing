'use client'

import {Box} from '@chakra-ui/react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import {useRef} from 'react'

export function AnimatedReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!root.current) return

      gsap.from(root.current, {
        autoAlpha: 0,
        delay,
        duration: 0.9,
        ease: 'power3.out',
        y: 28,
      })
    },
    {scope: root},
  )

  return <Box ref={root}>{children}</Box>
}
