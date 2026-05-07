'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonStyles = cva('btn', {
  variants: {
    variant: {
      primary: 'btn--primary',
      secondary: 'btn--secondary',
      ghost: 'btn--ghost',
      danger: 'bg-brand-coral text-white hover:opacity-90',
      premium: 'btn--premium',
    },
    size: {
      sm: 'btn--sm',
      md: 'btn--md',
      lg: 'btn--lg',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

export type ButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> &
  VariantProps<typeof buttonStyles> & {
    loading?: boolean
    children?: React.ReactNode
  }

export function Button({
  variant,
  size,
  loading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type="button"
      className={buttonStyles({ variant, size, className })}
      whileHover={{ scale: loading || disabled ? 1 : 1.02 }}
      whileTap={{ scale: loading || disabled ? 1 : 0.97 }}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <motion.div
          className="btn__spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      ) : (
        children
      )}
    </motion.button>
  )
}
