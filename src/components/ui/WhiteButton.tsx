import React from 'react';
import { Button, ButtonProps } from './button';
import Link from 'next/link';
import { cn } from '@/lib/utils'; 
import { PiSpinnerBold } from "react-icons/pi";

interface WhiteButtonProps extends ButtonProps {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  isActive?: boolean;
  primary?: boolean;
  href?: string;
}

const WhiteButton = ({
  children, 
  startContent, 
  endContent,
  className,
  size = 'default',
  isLoading = false,
  isDisabled = false,
  isFullWidth = false,
  isActive = false,
  primary  = false,
  href,
  ...props
}: WhiteButtonProps) => {
    return (
        <Button 
            asChild={href ? true : false}
            className={cn(
                `relative group duration-200 border-[transparent] font-semibold
                ${primary 
                    ?'bg-[var(--blue-secondary)] hover:bg-[var(--bg-secondary)] text-[var(--blue-primary)] hover:border-[1px] hover:border-[var(--blue-primary)]'
                    :'bg-[var(--bg-secondary)] hover:bg-[var(--blue-primary)] text-[var(--foreground)] hover:text-white'
                }
                ${isActive ? `bg-[var(--blue-primary)] text-white` : ''}
                ${isFullWidth ? `max-w-full` : `max-w-full sm:max-w-xs`}
                flex flex-row gap-2 border-[1px] border-[#f2f2f2] drop-shadow-sm`,
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

export default WhiteButton;
