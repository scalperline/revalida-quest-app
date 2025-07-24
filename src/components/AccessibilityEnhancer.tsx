import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente principal para melhorar a acessibilidade da aplicação
 * Inclui gerenciamento de foco, navegação por teclado e anúncios para leitores de tela
 */
export function AccessibilityEnhancer() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Gerenciamento de foco para mudanças de rota
    const mainElement = mainRef.current || document.querySelector('main');
    if (mainElement) {
      mainElement.focus();
    }

    // Anunciar mudanças de rota para leitores de tela
    announceRouteChange();
  }, [location]);

  useEffect(() => {
    // Verificar preferências de acessibilidade do usuário
    checkAccessibilityPreferences();
    
    // Atalhos de teclado
    const handleKeyDown = (e: KeyboardEvent) => {
      // Pular se o usuário está digitando em um input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Atalhos de navegação
      if (e.altKey) {
        handleNavigationShortcuts(e);
      }

      // Pular para conteúdo principal
      if (e.key === 'Tab' && e.shiftKey && e.altKey) {
        e.preventDefault();
        focusMainContent();
      }

      // Atalhos de acessibilidade
      if (e.ctrlKey && e.altKey) {
        handleAccessibilityShortcuts(e);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isHighContrast, isReducedMotion]);

  // Função para anunciar mudanças de rota
  const announceRouteChange = () => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    document.body.appendChild(announcement);

    const pageTitle = document.title || 'Revalida Quest';
    announcement.textContent = `Navegou para ${pageTitle}`;

    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  };

  // Função para verificar preferências de acessibilidade
  const checkAccessibilityPreferences = () => {
    // Verificar preferência de alto contraste
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(highContrastQuery.matches);

    // Verificar preferência de movimento reduzido
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(reducedMotionQuery.matches);

    // Aplicar classes CSS baseadas nas preferências
    document.documentElement.classList.toggle('high-contrast', isHighContrast);
    document.documentElement.classList.toggle('reduced-motion', isReducedMotion);
  };

  // Função para atalhos de navegação
  const handleNavigationShortcuts = (e: KeyboardEvent) => {
    switch (e.key) {
      case '1':
        e.preventDefault();
        navigateTo('/app');
        break;
      case '2':
        e.preventDefault();
        navigateTo('/questions');
        break;
      case '3':
        e.preventDefault();
        navigateTo('/missions');
        break;
      case '4':
        e.preventDefault();
        navigateTo('/stats');
        break;
      case '5':
        e.preventDefault();
        navigateTo('/ranking');
        break;
      case 'h':
        e.preventDefault();
        navigateTo('/');
        break;
    }
  };

  // Função para atalhos de acessibilidade
  const handleAccessibilityShortcuts = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'c':
        e.preventDefault();
        toggleHighContrast();
        break;
      case 'm':
        e.preventDefault();
        toggleReducedMotion();
        break;
      case 'f':
        e.preventDefault();
        focusMainContent();
        break;
      case 's':
        e.preventDefault();
        showAccessibilityMenu();
        break;
    }
  };

  // Função para navegação
  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  // Função para focar conteúdo principal
  const focusMainContent = () => {
    const mainElement = document.querySelector('main') || 
                       document.querySelector('#main-content') ||
                       document.querySelector('[role="main"]');
    if (mainElement) {
      (mainElement as HTMLElement).focus();
    }
  };

  // Função para alternar alto contraste
  const toggleHighContrast = () => {
    setIsHighContrast(!isHighContrast);
    document.documentElement.classList.toggle('high-contrast', !isHighContrast);
    announceToScreenReader('Alto contraste ' + (!isHighContrast ? 'ativado' : 'desativado'));
  };

  // Função para alternar movimento reduzido
  const toggleReducedMotion = () => {
    setIsReducedMotion(!isReducedMotion);
    document.documentElement.classList.toggle('reduced-motion', !isReducedMotion);
    announceToScreenReader('Movimento reduzido ' + (!isReducedMotion ? 'ativado' : 'desativado'));
  };

  // Função para mostrar menu de acessibilidade
  const showAccessibilityMenu = () => {
    // Implementar menu de acessibilidade
    announceToScreenReader('Menu de acessibilidade aberto');
  };

  // Função para anunciar para leitores de tela
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);

    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 2000);
  };

  return null;
}

/**
 * Hook para melhorar o gerenciamento de foco em componentes interativos
 */
export function useFocusManagement() {
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

  // Armadilha de foco para modais e menus
  const trapFocus = (element: HTMLElement) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0] as HTMLElement;
    const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    
    // Retornar função de limpeza
    return () => document.removeEventListener('keydown', handleTabKey);
  };

  // Focar no primeiro elemento focável
  const focusFirstElement = (element: HTMLElement) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0] as HTMLElement;
    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
  };

  // Focar no último elemento focável
  const focusLastElement = (element: HTMLElement) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;
    if (lastFocusableElement) {
      lastFocusableElement.focus();
    }
  };

  return {
    trapFocus,
    focusFirstElement,
    focusLastElement
  };
}

/**
 * Componente de botão acessível com melhorias de acessibilidade
 */
export function AccessibleButton({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      className={`accessible-button ${className}`}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Componente de link acessível com melhorias de acessibilidade
 */
export function AccessibleLink({ 
  children, 
  href, 
  className = '', 
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  ...props 
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={`accessible-link ${className}`}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      {...props}
    >
      {children}
    </a>
  );
}

/**
 * Hook para detectar preferências de acessibilidade do usuário
 */
export function useAccessibilityPreferences() {
  const [preferences, setPreferences] = useState({
    highContrast: false,
    reducedMotion: false,
    reducedData: false,
    prefersColorScheme: 'light' as 'light' | 'dark'
  });

  useEffect(() => {
    const updatePreferences = () => {
      setPreferences({
        highContrast: window.matchMedia('(prefers-contrast: high)').matches,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        reducedData: window.matchMedia('(prefers-reduced-data: reduce)').matches,
        prefersColorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      });
    };

    // Verificar preferências iniciais
    updatePreferences();

    // Adicionar listeners para mudanças
    const mediaQueries = [
      window.matchMedia('(prefers-contrast: high)'),
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-reduced-data: reduce)'),
      window.matchMedia('(prefers-color-scheme: dark)')
    ];

    mediaQueries.forEach(query => {
      query.addEventListener('change', updatePreferences);
    });

    return () => {
      mediaQueries.forEach(query => {
        query.removeEventListener('change', updatePreferences);
      });
    };
  }, []);

  return preferences;
}

/**
 * Componente para mostrar informações de acessibilidade
 */
export function AccessibilityInfo() {
  const preferences = useAccessibilityPreferences();

  return (
    <div className="accessibility-info" role="region" aria-label="Informações de acessibilidade">
      <h3>Atalhos de Teclado</h3>
      <ul>
        <li><kbd>Alt + 1-5</kbd> - Navegação rápida</li>
        <li><kbd>Alt + Shift + Tab</kbd> - Pular para conteúdo principal</li>
        <li><kbd>Ctrl + Alt + C</kbd> - Alternar alto contraste</li>
        <li><kbd>Ctrl + Alt + M</kbd> - Alternar movimento reduzido</li>
        <li><kbd>Ctrl + Alt + F</kbd> - Focar conteúdo principal</li>
        <li><kbd>Ctrl + Alt + S</kbd> - Menu de acessibilidade</li>
      </ul>
      
      <h3>Preferências Detectadas</h3>
      <ul>
        <li>Alto contraste: {preferences.highContrast ? 'Sim' : 'Não'}</li>
        <li>Movimento reduzido: {preferences.reducedMotion ? 'Sim' : 'Não'}</li>
        <li>Dados reduzidos: {preferences.reducedData ? 'Sim' : 'Não'}</li>
        <li>Esquema de cores: {preferences.prefersColorScheme}</li>
      </ul>
    </div>
  );
} 