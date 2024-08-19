import React from 'react';
import { Button, ButtonProps } from './button';
import Link from 'next/link';
import { cn } from '@/lib/utils'; 
import { PiSpinnerBold } from "react-icons/pi";

interface CTAButtonProps extends ButtonProps {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  href?: string;
}

const CTAButton = ({
  children, 
  startContent, 
  endContent,
  className,
  size = 'default',
  isLoading = false,
  isDisabled = false,
  isFullWidth = false,
  href,
  ...props
}: CTAButtonProps) => {
    return (
        <Button 
            asChild={href ? true : false}
            className={cn(
                `relative bg-[var(--blue-primary)] font-semibold
                hover:bg-[var(--bg-secondary)] text-[var(--blue-primary)] hover:border-[1px] hover:border-[var(--blue-primary)]
                text-white hover:text-[var(--blue-primary)] group duration-200
                flex flex-row gap-2 border-1 border-[#f2f2f2] drop-shadow-sm w-full items-center
                ${isFullWidth ? `max-w-full` : `max-w-full sm:max-w-xs`}`,
                className
            )}
            size={size}
            disabled={isDisabled || isLoading} // Deshabilitar el botón si está cargando o si está deshabilitado
            {...props}
        >
            {href 
                ?<Link href={href}>
                    {isLoading && (
                        <PiSpinnerBold className='h-4 w-4 animate-spin'/>
                    )}
                    {!isLoading && startContent}
                    {!isLoading && children}
                    {!isLoading && endContent}
                </Link>
                :<>
                    {isLoading && (
                        <PiSpinnerBold className='h-4 w-4 animate-spin'/>
                    )}
                    {!isLoading && startContent}
                    {!isLoading && children}
                    {!isLoading && endContent}
                </>
            }
        </Button>
    ) 
}

export default CTAButton;
