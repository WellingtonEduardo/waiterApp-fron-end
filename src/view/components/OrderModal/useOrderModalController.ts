import { useEffect } from 'react';



interface useOrderModalControllerProps {
  onCloseModal(): void
}

export function useOrderModalController({ onCloseModal }: useOrderModalControllerProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseModal();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);
}
